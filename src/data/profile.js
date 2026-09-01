// This file has gone through two unrelated, unexported design sketches so
// far, neither ever imported anywhere in src/ - the sections/media-based
// `profile` in the commented-out block just below (which also pointed at a
// nonexistent image, /images/fuuz-ui.png), and the flatter
// UserRoles/profile/gallery/etc. sketch further down that replaced it. Both
// are dead data, not wired to anything - see the NOTE further down for what
// needs to happen before either becomes a real schema.
// For now this is "you"; later it can be any user profile

// dead: old commented-out version of `profile` (sections/media based),
// superseded by the flatter shape below. Safe to delete.
// export const profile = {
//   username: "ilsa",
//   displayName: "Ilsa Hampton",
//   bio: "Software engineer & former Army paramedic, building interactive portfolios.",
//   sections: [
//     {
//       id: "experience",
//       title: "Experience",
//       layout: "cards",
//       items: [
//         {
//           id: "army-paramedic",
//           type: "experience",
//           title: "Army Paramedic (Airborne Infantry)",
//           period: "2017–2022",
//           description: "High-pressure emergency care, leadership, and training.",
//           media: [],
//         },
//         {
//           id: "mfgx-fuuz",
//           type: "experience",
//           title: "Level 2 Software Engineer – MFGx (Fuuz)",
//           period: "2022–2025",
//           description:
//             "UI/UX and security for low/no-code application designer.",
//           media: [
//             {
//               id: "fuuz-ui-screenshot",
//               type: "image",
//               title: "Fuuz UI mock",
//               src: "/images/fuuz-ui.png", // later Cloudinary URLs
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

// may turn to typescript types and interfaces to organize data
// then I need to actually create data models and connect ot database smartly

// NOTE: none of the objects below (UserRoles, profile, GuildMemberProfile,
// gallery, blogPost, blog, journalEntry, journal, tag) are exported, and
// nothing in src/ imports this file - this is a pure design sketch (using
// 'string'/'date' as placeholder type annotations), not live data or a
// schema yet. See the two bugs flagged further down before turning this
// into real exported schemas/types.
const UserRoles = {
  ADMIN: "admin", // me
  Connoisseur: "connoisseur", // view public content, comment ,saving favorites
  GuildMember: "guildMember", // can comment, save favorites, create galleries, create blog, and journal entries
}

const profile = {
  userId: 'string',
  username: 'string',
  displayName: 'string',
  email: 'string',
  role: 'connoisseur', // default role
  bio: 'string',
  favorites: {
    galleries: [], //gallery IDs
    blogs: [], //blog IDs
    guildMembers: [], //user IDs
  }
}

// ...extendsProfile
const GuildMemberProfile = {
  role:'guildMember',
  galleriesCreated: [], //gallery IDs
  blogsCreated: [], //blog IDs
  journalEntries: [], //journal entry IDs
}

const gallery = {
  galleryId: 'string',
  title: 'string',
  description: 'string',
  creatorId: 'string', // user ID of the creator
  mediaItems: [
    {
      mediaId: 'string',
      type: 'image' | 'video',
      title: 'string',
      caption: 'string',
      src: 'string', // URL to media
    },
  ],
  createdAt: 'date',
}

const blogPost = {
  // BUG: `blogId` is declared twice in this object literal - the second
  // (line below) silently overwrites the first. The first one was probably
  // meant to be this post's own id (e.g. `postId`).
  blogId: 'string',
  title: 'string',
  content: 'string',
  blogId: 'string', // blog ID that the post belongs to
  createdAt: 'date',
  updatedAt: 'date',
};

const blog = {
  blogId: 'string',
  title: 'string',
  description: 'string',  
  blogPosts: [blogPost], // array of blog posts
  creatorId: 'string', // user ID of the creator
  createdAt: 'date',
}

const journalEntry = {
  journalId:'string', // the journal the entry is in
  entryId: 'string',
  title: 'string',
  content: 'string',
  createdAt: 'date',
  updatedAt: 'date',
};

const journal = {
  journalId: 'string',
  title: 'string',
  description: 'string',
  // BUG: references `tag` (declared with `const` further below) before its
  // declaration. Harmless today since this file is never imported/executed,
  // but if it were, this throws a ReferenceError immediately at module load
  // (const bindings are in the temporal dead zone until their declaration
  // runs). Move `tag`'s declaration above this.
  tags:[tag],
  creatorId: 'string', // user ID of the creator
  entries: [journalEntry], // array of journal entries
  createdAt: 'date',
}

const tag = {
  tagId: 'string',
  name: 'string',
}
