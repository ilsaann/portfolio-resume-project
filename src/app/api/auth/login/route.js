import { User } from '../../../../models/User.js';
import { connectDB } from '../../../../lib/db.js';
import { createToken } from '../../../../lib/auth.js';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();

    const approvedEmails = process.env.APPROVED_EMAILS?.split(',').map(e => e.trim()) || [];

    if (!approvedEmails.includes(email)) {
      return new Response(JSON.stringify({ error: 'Email not approved' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // First approved email becomes admin, others are connoisseur
      const role = email === approvedEmails[0] ? 'admin' : 'connoisseur';

      user = new User({
        email,
        isApproved: true,
        role,
      });

      await user.save();
    }

    const token = await createToken(user._id.toString());

    return new Response(
      JSON.stringify({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
