// app/projects/blog/page.jsx
'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Button, Stack, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
// NOTE: posts live only in useState below, seeded from this static array -
// reordering/filtering is client-only and resets on refresh. No backend/API
// call anywhere in this file.
import { initialBlogPosts } from '../../../data/blogPosts';
import BlogPostCard from '../../../components/blog/BlogPostCard';
import BlogReorderControls from '../../../components/blog/BlogReorderControls';

export default function BlogProjectPage() {
  const [posts, setPosts] = useState(initialBlogPosts);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const router = useRouter();

  const allTags = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      (p.tags || []).forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((p) => (p.tags || []).includes(activeTag));
  }, [posts, activeTag]);

  const handleOpenPost = (slug) => {
    // BROKEN LINK: src/app/projects/blog/[slug]/page.js is currently empty
    // (no default export), so this navigates to a route that won't render.
    router.push(`/projects/blog/${slug}`);
  };

  const movePost = (fromIndex, toIndex) => {
    setPosts((prev) => {
      if (toIndex < 0 || toIndex >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const handleCreateNew = () => {
    // BROKEN LINK: no src/app/projects/blog/new/ route exists yet - this is
    // currently a dead link (404).
    router.push('/projects/blog/new');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'var(--font-italiana), serif',
            fontWeight: 600,
          }}
        >
          Blog
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button
            variant={isReorderMode ? 'contained' : 'outlined'}
            color="secondary"
            onClick={() => setIsReorderMode((v) => !v)}
          >
            {isReorderMode ? 'Done reordering' : 'Edit order'}
          </Button>
          <Button variant="contained" color="primary" onClick={handleCreateNew}>
            New post
          </Button>
        </Stack>
      </Stack>

      {allTags.length > 0 && (
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2, flexWrap: 'wrap' }}
        >
          <Chip
            label="All"
            size="small"
            clickable
            onClick={() => setActiveTag(null)}
            color={activeTag === null ? 'primary' : 'default'}
            variant={activeTag === null ? 'filled' : 'outlined'}
          />
          {allTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              clickable
              onClick={() =>
                setActiveTag((prev) => (prev === tag ? null : tag))
              }
              color={activeTag === tag ? 'primary' : 'default'}
              variant={activeTag === tag ? 'filled' : 'outlined'}
            />
          ))}
        </Stack>
      )}

      <Stack spacing={2}>
        {filteredPosts.map((post, index) => (
          <Box key={post.id}>
            <BlogPostCard post={post} onOpen={() => handleOpenPost(post.slug)} />
            {isReorderMode && (
              <BlogReorderControls
                index={index}
                total={filteredPosts.length}
                onMoveUp={() => movePost(index, index - 1)}
                onMoveDown={() => movePost(index, index + 1)}
              />
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
