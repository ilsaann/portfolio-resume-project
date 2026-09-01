import mongoose from 'mongoose';

// Matches the shape src/components/InteractiveResume.js and Card.js already
// expect (originally hardcoded per-member in src/app/resume/page.js) - so
// any member's own experience/skills render through the same reusable
// components as Ilsa's own resume page.
const mediaSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    tag: String,
    caption: String,
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    dates: String,
    summary: String,
    bullets: [String],
    media: [mediaSchema],
  },
  { _id: false }
);

const skillSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    content: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: String,
    profilePicture: String,
    bio: String,
    role: {
      type: String,
      enum: ['connoisseur', 'guildMember', 'admin'],
      default: 'connoisseur',
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    // The theme for this member's About Me page - galleries without their
    // own theme set inherit this one (see Gallery.theme).
    theme: {
      type: String,
      enum: ['jane', 'academia', 'turtle'],
      default: 'jane',
    },
    // Interactive resume content for this member's About Me page.
    experience: [experienceSchema],
    skills: [skillSchema],
    galleries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gallery',
      },
    ],
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost',
      },
    ],
    journalEntries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JournalEntry',
      },
    ],
    likedBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost',
      },
    ],
    savedBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost',
      },
    ],
    likedGalleries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gallery',
      },
    ],
    likedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
