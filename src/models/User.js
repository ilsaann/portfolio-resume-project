import mongoose from 'mongoose';

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
