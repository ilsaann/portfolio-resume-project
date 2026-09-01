import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route.js';
import { connectDB } from '../../../lib/db.js';
import { Gallery } from '../../../models/Gallery.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Migrated from writing to public/uploads (local disk) to Cloudinary -
// local disk doesn't survive Vercel's ephemeral filesystem in production,
// so uploaded gallery photos would have silently disappeared after the
// serving instance recycled.
export async function POST(req) {
  try {
    // SECURITY: this route used to accept any POST with a file + galleryId,
    // no auth at all - anyone could upload into any gallery. Require a
    // signed-in session and verify they actually own the gallery (or are
    // an admin) before uploading anything.
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const galleryId = formData.get('galleryId');

    if (!file || !galleryId) {
      return new Response(
        JSON.stringify({ error: 'File and galleryId are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await connectDB();
    const gallery = await Gallery.findById(galleryId);
    if (!gallery) {
      return new Response(
        JSON.stringify({ error: 'Gallery not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (gallery.artist.toString() !== session.user.id && session.user.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Not authorized to upload to this gallery' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: `janes-guild/${galleryId}` },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return new Response(
      JSON.stringify({
        success: true,
        // public_id is what a future delete-photo feature would need to
        // remove the image from Cloudinary too, not just from Mongo.
        filename: uploadResult.public_id,
        filepath: uploadResult.secure_url,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
