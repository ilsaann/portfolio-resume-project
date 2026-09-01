// data/blogPosts.js

export const initialBlogPosts = [
  {
    id: '1',
    slug: 'hello-blog',
    title: 'Hello Blog',
    subtitle: 'Kicking off my personal dev journal',
    createdAt: '2026-03-20T00:00:00.000Z',
    updatedAt: '2026-03-20T00:00:00.000Z',
    contentBlocks: [
      'This is my first post in a tiny blog inside my resume site.',
      'I am experimenting with a simple writing space attached to my portfolio.',
    ],
    tags: ['intro', 'personal'],
  },
  {
    id: '2',
    slug: 'project-idea-x',
    title: 'Project Idea X',
    subtitle: 'First notes on a new thing',
    createdAt: '2026-03-21T00:00:00.000Z',
    updatedAt: '2026-03-21T00:00:00.000Z',
    contentBlocks: [
      'High-level goals for project X...',
      'Things I want to explore in this series of posts.',
    ],
    tags: ['project-x', 'dev-notes'],
  },
];
