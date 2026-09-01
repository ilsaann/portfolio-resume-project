import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'postType',
      required: true,
    },
    postType: {
      type: String,
      enum: ['BlogPost', 'Gallery'],
      required: true,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
