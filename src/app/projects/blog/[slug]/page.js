// EMPTY/BUG: this file is completely empty - no default export. This is the
// blog post detail route that src/app/projects/blog/page.js:31 already links
// to (router.push(`/projects/blog/${slug}`)), so that "open post" action is
// currently a broken link/build error, not just an unfinished feature.
// Needs a real page component reading the post by slug (from
// src/data/blogPosts.js for now, a real API/DB later) before it's linked to.
