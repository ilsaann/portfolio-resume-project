import { User } from '../models/User.js';
import { Gallery } from '../models/Gallery.js';
import { BlogPost } from '../models/BlogPost.js';
import { JournalEntry } from '../models/JournalEntry.js';
import { Comment } from '../models/Comment.js';
import { connectDB } from '../lib/db.js';

// Helper to ensure user is authenticated
const getAuthenticatedUser = async (context) => {
  if (!context.userId) {
    throw new Error('Not authenticated');
  }
  return User.findById(context.userId);
};

export const resolvers = {
  Query: {
    // User queries
    me: async (_, __, context) => {
      await connectDB();
      return getAuthenticatedUser(context);
    },

    user: async (_, { id }) => {
      await connectDB();
      return User.findById(id)
        .populate('galleries')
        .populate('blogs')
        .populate('journalEntries');
    },

    allUsers: async () => {
      await connectDB();
      return User.find();
    },

    // Gallery queries
    gallery: async (_, { id }) => {
      await connectDB();
      return Gallery.findById(id)
        .populate('artist');
    },

    userGalleries: async (_, { userId }) => {
      await connectDB();
      return Gallery.find({ artist: userId })
        .populate('artist');
    },

    publishedGalleries: async () => {
      await connectDB();
      return Gallery.find({ isPublished: true })
        .populate('artist');
    },

    // Blog queries
    blogPost: async (_, { id }) => {
      await connectDB();
      return BlogPost.findById(id)
        .populate('author');
    },

    userBlogs: async (_, { userId }) => {
      await connectDB();
      return BlogPost.find({ author: userId })
        .populate('author');
    },

    publishedBlogs: async () => {
      await connectDB();
      return BlogPost.find({ isPublished: true })
        .populate('author');
    },

    // Journal queries
    journalEntry: async (_, { id }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const entry = await JournalEntry.findById(id)
        .populate('author');

      // Only allow viewing if it's the author or the user is an admin
      if (entry.isPrivate && entry.author._id.toString() !== user._id.toString() && user.role !== 'admin') {
        throw new Error('Not authorized to view this entry');
      }

      return entry;
    },

    userJournalEntries: async (_, { userId }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);

      // Only allow viewing own entries or if you're an admin
      if (userId !== user._id.toString() && user.role !== 'admin') {
        throw new Error('Not authorized');
      }

      return JournalEntry.find({ author: userId })
        .populate('author');
    },

    // Comment queries
    blogComments: async (_, { blogPostId }) => {
      await connectDB();
      return Comment.find({ postId: blogPostId, postType: 'BlogPost' })
        .populate('author');
    },

    galleryComments: async (_, { galleryId }) => {
      await connectDB();
      return Comment.find({ postId: galleryId, postType: 'Gallery' })
        .populate('author');
    },
  },

  Mutation: {
    // Auth mutations
    // NOTE: login is REST-only now (POST /api/auth/login) since it's the one
    // that actually issues a usable JWT via createToken() - a GraphQL
    // loginUser mutation used to duplicate this find-or-create logic without
    // returning a token, so it was removed rather than left unusable.

    // User mutations
    updateProfile: async (_, { name, bio, profilePicture }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);

      if (name) user.name = name;
      if (bio) user.bio = bio;
      if (profilePicture) user.profilePicture = profilePicture;

      await user.save();
      return user;
    },

    approveUser: async (_, { userId }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);

      if (user.role !== 'admin') {
        throw new Error('Only admins can approve users');
      }

      const targetUser = await User.findByIdAndUpdate(
        userId,
        { isApproved: true },
        { new: true }
      );

      return targetUser;
    },

    changeUserRole: async (_, { userId, role }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);

      if (user.role !== 'admin') {
        throw new Error('Only admins can change user roles');
      }

      const targetUser = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      );

      return targetUser;
    },

    // Gallery mutations
    createGallery: async (_, { title, description, photoCount }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);

      const gallery = new Gallery({
        title,
        description,
        artist: user._id,
        photoCount,
      });

      await gallery.save();
      await user.updateOne({ $push: { galleries: gallery._id } });

      return gallery.populate('artist');
    },

    updateGallery: async (_, { id, title, description, theme }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const gallery = await Gallery.findById(id);

      if (gallery.artist.toString() !== user._id.toString() && user.role !== 'admin') {
        throw new Error('Not authorized to update this gallery');
      }

      if (title) gallery.title = title;
      if (description) gallery.description = description;
      if (theme) gallery.theme = theme;

      await gallery.save();
      return gallery.populate('artist');
    },

    publishGallery: async (_, { id }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const gallery = await Gallery.findById(id);

      if (gallery.artist.toString() !== user._id.toString() && user.role !== 'admin') {
        throw new Error('Not authorized');
      }

      gallery.isPublished = true;
      await gallery.save();
      return gallery.populate('artist');
    },

    addPhotoToGallery: async (_, { galleryId, filename, filepath, caption }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const gallery = await Gallery.findById(galleryId);

      if (gallery.artist.toString() !== user._id.toString() && user.role !== 'admin') {
        throw new Error('Not authorized');
      }

      gallery.photos.push({ filename, filepath, caption });
      await gallery.save();
      return gallery.populate('artist');
    },

    deleteGallery: async (_, { id }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const gallery = await Gallery.findById(id);

      if (gallery.artist.toString() !== user._id.toString() && user.role !== 'admin') {
        throw new Error('Not authorized');
      }

      await Gallery.findByIdAndDelete(id);
      await user.updateOne({ $pull: { galleries: id } });
      return true;
    },

    // Blog mutations
    createBlogPost: async (_, { title, content, excerpt, tags }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);

      const blog = new BlogPost({
        title,
        content,
        excerpt,
        tags,
        author: user._id,
      });

      await blog.save();
      await user.updateOne({ $push: { blogs: blog._id } });
      return blog.populate('author');
    },

    updateBlogPost: async (_, { id, title, content, excerpt, tags }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const blog = await BlogPost.findById(id);

      if (blog.author.toString() !== user._id.toString() && user.role !== 'admin') {
        throw new Error('Not authorized');
      }

      if (title) blog.title = title;
      if (content) blog.content = content;
      if (excerpt) blog.excerpt = excerpt;
      if (tags) blog.tags = tags;

      await blog.save();
      return blog.populate('author');
    },

    publishBlogPost: async (_, { id }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const blog = await BlogPost.findById(id);

      if (blog.author.toString() !== user._id.toString() && user.role !== 'admin') {
        throw new Error('Not authorized');
      }

      blog.isPublished = true;
      await blog.save();
      return blog.populate('author');
    },

    deleteBlogPost: async (_, { id }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const blog = await BlogPost.findById(id);

      if (blog.author.toString() !== user._id.toString() && user.role !== 'admin') {
        throw new Error('Not authorized');
      }

      await BlogPost.findByIdAndDelete(id);
      await user.updateOne({ $pull: { blogs: id } });
      return true;
    },

    incrementBlogViews: async (_, { id }) => {
      await connectDB();
      const blog = await BlogPost.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
      return blog.populate('author');
    },

    // Journal mutations
    createJournalEntry: async (_, { title, content, mood, tags, isPrivate }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);

      const entry = new JournalEntry({
        title,
        content,
        mood,
        tags,
        isPrivate: isPrivate !== undefined ? isPrivate : true,
        author: user._id,
      });

      await entry.save();
      await user.updateOne({ $push: { journalEntries: entry._id } });
      return entry.populate('author');
    },

    updateJournalEntry: async (_, { id, title, content, mood, tags, isPrivate }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const entry = await JournalEntry.findById(id);

      if (entry.author.toString() !== user._id.toString() && user.role !== 'admin') {
        throw new Error('Not authorized');
      }

      if (title) entry.title = title;
      if (content) entry.content = content;
      if (mood) entry.mood = mood;
      if (tags) entry.tags = tags;
      if (isPrivate !== undefined) entry.isPrivate = isPrivate;

      await entry.save();
      return entry.populate('author');
    },

    deleteJournalEntry: async (_, { id }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const entry = await JournalEntry.findById(id);

      if (entry.author.toString() !== user._id.toString() && user.role !== 'admin') {
        throw new Error('Not authorized');
      }

      await JournalEntry.findByIdAndDelete(id);
      await user.updateOne({ $pull: { journalEntries: id } });
      return true;
    },

    // Like mutations
    likeBlogPost: async (_, { blogPostId }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const blog = await BlogPost.findById(blogPostId);

      if (!blog.likes.includes(user._id)) {
        blog.likes.push(user._id);
        await blog.save();
        await user.updateOne({ $push: { likedBlogs: blogPostId } });
      }

      return blog.populate(['author', 'likes']);
    },

    unlikeBlogPost: async (_, { blogPostId }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const blog = await BlogPost.findById(blogPostId);

      blog.likes = blog.likes.filter(id => id.toString() !== user._id.toString());
      await blog.save();
      await user.updateOne({ $pull: { likedBlogs: blogPostId } });

      return blog.populate(['author', 'likes']);
    },

    likeGallery: async (_, { galleryId }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const gallery = await Gallery.findById(galleryId);

      if (!gallery.likes.includes(user._id)) {
        gallery.likes.push(user._id);
        await gallery.save();
        await user.updateOne({ $push: { likedGalleries: galleryId } });
      }

      return gallery.populate(['artist', 'likes']);
    },

    unlikeGallery: async (_, { galleryId }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const gallery = await Gallery.findById(galleryId);

      gallery.likes = gallery.likes.filter(id => id.toString() !== user._id.toString());
      await gallery.save();
      await user.updateOne({ $pull: { likedGalleries: galleryId } });

      return gallery.populate(['artist', 'likes']);
    },

    likeUser: async (_, { userId }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const targetUser = await User.findById(userId);

      if (!targetUser.likedUsers.includes(user._id)) {
        targetUser.likedUsers.push(user._id);
        await targetUser.save();
      }

      return targetUser;
    },

    unlikeUser: async (_, { userId }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const targetUser = await User.findById(userId);

      targetUser.likedUsers = targetUser.likedUsers.filter(id => id.toString() !== user._id.toString());
      await targetUser.save();

      return targetUser;
    },

    // Save mutations
    saveBlogPost: async (_, { blogPostId }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const blog = await BlogPost.findById(blogPostId);

      if (!blog.saves.includes(user._id)) {
        blog.saves.push(user._id);
        await blog.save();
        await user.updateOne({ $push: { savedBlogs: blogPostId } });
      }

      return blog.populate(['author', 'likes', 'saves']);
    },

    unsaveBlogPost: async (_, { blogPostId }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const blog = await BlogPost.findById(blogPostId);

      blog.saves = blog.saves.filter(id => id.toString() !== user._id.toString());
      await blog.save();
      await user.updateOne({ $pull: { savedBlogs: blogPostId } });

      return blog.populate(['author', 'likes', 'saves']);
    },

    // Comment mutations
    addComment: async (_, { postId, postType, content }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);

      const comment = new Comment({
        content,
        author: user._id,
        postId,
        postType,
      });

      await comment.save();

      // Add comment to post
      if (postType === 'BlogPost') {
        await BlogPost.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
      } else if (postType === 'Gallery') {
        await Gallery.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
      }

      return comment.populate('author');
    },

    deleteComment: async (_, { commentId }, context) => {
      await connectDB();
      const user = await getAuthenticatedUser(context);
      const comment = await Comment.findById(commentId);

      // Check if user is comment author or admin
      let postOwner;
      if (comment.postType === 'BlogPost') {
        const post = await BlogPost.findById(comment.postId);
        postOwner = post.author;
      } else if (comment.postType === 'Gallery') {
        const post = await Gallery.findById(comment.postId);
        postOwner = post.artist;
      }

      if (comment.author._id.toString() !== user._id.toString() && 
          postOwner.toString() !== user._id.toString() && 
          user.role !== 'admin') {
        throw new Error('Not authorized to delete this comment');
      }

      // Remove comment from post
      if (comment.postType === 'BlogPost') {
        await BlogPost.findByIdAndUpdate(comment.postId, { $pull: { comments: commentId } });
      } else if (comment.postType === 'Gallery') {
        await Gallery.findByIdAndUpdate(comment.postId, { $pull: { comments: commentId } });
      }

      await Comment.findByIdAndDelete(commentId);
      return true;
    },
  },
};
