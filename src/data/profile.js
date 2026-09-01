// For now this is "you"; later it can be any user profile

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
  tags:[tag],
  creatorId: 'string', // user ID of the creator
  entries: [journalEntry], // array of journal entries
  createdAt: 'date',
}

const tag = {
  tagId: 'string',
  name: 'string',
}
