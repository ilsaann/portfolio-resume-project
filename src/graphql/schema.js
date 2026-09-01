import { gql } from 'graphql-tag';

export const typeDefs = gql`
  enum Role {
    connoisseur
    guildMember
    admin
  }

  enum Mood {
    happy
    sad
    neutral
    excited
    anxious
    calm
  }

  enum Theme {
    minimal
    dark
    vibrant
    classic
    modern
  }

  type Photo {
    id: ID!
    filename: String!
    filepath: String!
    caption: String
    uploadedAt: String!
  }

  type User {
    id: ID!
    email: String!
    name: String
    profilePicture: String
    bio: String
    role: Role!
    isApproved: Boolean!
    galleries: [Gallery!]
    blogs: [BlogPost!]
    journalEntries: [JournalEntry!]
    likedBlogs: [BlogPost!]
    savedBlogs: [BlogPost!]
    likedGalleries: [Gallery!]
    likedUsers: [User!]
    createdAt: String!
    updatedAt: String!
  }

  type Gallery {
    id: ID!
    title: String!
    description: String
    artist: User!
    photos: [Photo!]!
    theme: Theme!
    isPublished: Boolean!
    photoCount: Int!
    likes: [User!]
    comments: [Comment!]
    createdAt: String!
    updatedAt: String!
  }

  type BlogPost {
    id: ID!
    title: String!
    content: String!
    author: User!
    excerpt: String
    tags: [String!]
    isPublished: Boolean!
    views: Int!
    featuredImage: String
    likes: [User!]
    saves: [User!]
    comments: [Comment!]
    createdAt: String!
    updatedAt: String!
  }

  type JournalEntry {
    id: ID!
    title: String!
    content: String!
    author: User!
    mood: Mood
    tags: [String!]
    isPrivate: Boolean!
    entryDate: String!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    postType: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    # User queries
    me: User
    user(id: ID!): User
    allUsers: [User!]!

    # Gallery queries
    gallery(id: ID!): Gallery
    userGalleries(userId: ID!): [Gallery!]!
    publishedGalleries: [Gallery!]!

    # Blog queries
    blogPost(id: ID!): BlogPost
    userBlogs(userId: ID!): [BlogPost!]!
    publishedBlogs: [BlogPost!]!

    # Journal queries
    journalEntry(id: ID!): JournalEntry
    userJournalEntries(userId: ID!): [JournalEntry!]!

    # Comment queries
    blogComments(blogPostId: ID!): [Comment!]!
    galleryComments(galleryId: ID!): [Comment!]!
  }

  type Mutation {
    # Auth mutations
    loginUser(email: String!): User

    # User mutations
    updateProfile(name: String, bio: String, profilePicture: String): User
    approveUser(userId: ID!): User
    changeUserRole(userId: ID!, role: Role!): User

    # Gallery mutations
    createGallery(title: String!, description: String, photoCount: Int!): Gallery
    updateGallery(id: ID!, title: String, description: String, theme: Theme): Gallery
    publishGallery(id: ID!): Gallery
    addPhotoToGallery(galleryId: ID!, filename: String!, filepath: String!, caption: String): Gallery
    deleteGallery(id: ID!): Boolean

    # Blog mutations
    createBlogPost(title: String!, content: String!, excerpt: String, tags: [String!]): BlogPost
    updateBlogPost(id: ID!, title: String, content: String, excerpt: String, tags: [String!]): BlogPost
    publishBlogPost(id: ID!): BlogPost
    deleteBlogPost(id: ID!): Boolean
    incrementBlogViews(id: ID!): BlogPost

    # Journal mutations
    createJournalEntry(title: String!, content: String!, mood: Mood, tags: [String!], isPrivate: Boolean): JournalEntry
    updateJournalEntry(id: ID!, title: String, content: String, mood: Mood, tags: [String!], isPrivate: Boolean): JournalEntry
    deleteJournalEntry(id: ID!): Boolean

    # Like mutations
    likeBlogPost(blogPostId: ID!): BlogPost
    unlikeBlogPost(blogPostId: ID!): BlogPost
    likeGallery(galleryId: ID!): Gallery
    unlikeGallery(galleryId: ID!): Gallery
    likeUser(userId: ID!): User
    unlikeUser(userId: ID!): User

    # Save mutations
    saveBlogPost(blogPostId: ID!): BlogPost
    unsaveBlogPost(blogPostId: ID!): BlogPost

    # Comment mutations
    addComment(postId: ID!, postType: String!, content: String!): Comment
    deleteComment(commentId: ID!): Boolean
  }
`;
