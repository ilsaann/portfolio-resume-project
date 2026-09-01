import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route.js';
import { connectDB } from '../../../lib/db.js';
import { Gallery } from '../../../models/Gallery.js';

export async function POST(req) {
  try {
    // SECURITY: this route used to accept any POST with a file + galleryId,
    // no auth at all - anyone could write into any gallery's upload folder.
    // Require a signed-in session and verify they actually own the gallery
    // (or are an admin) before writing anything to disk.
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

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', galleryId);
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const filepath = join(uploadsDir, filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    return new Response(
      JSON.stringify({
        success: true,
        filename,
        filepath: `/uploads/${galleryId}/${filename}`,
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
