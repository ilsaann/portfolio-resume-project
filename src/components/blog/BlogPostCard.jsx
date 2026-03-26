// components/blog/BlogPostCard.jsx
'use client';

import { Card, CardContent, Typography, Box, Chip, Stack } from '@mui/material';

export default function BlogPostCard({ post, onOpen }) {
  const { title, subtitle, createdAt, tags = [] } = post;

  return (
    <Card
      onClick={onOpen}
      sx={{
        width: '100%',
        maxWidth: 720,
        mx: 'auto',
        cursor: 'pointer',
        backgroundColor: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(6px)',
        borderRadius: 2,
        border: '1px solid rgba(255, 215, 0, 0.4)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'var(--font-italiana), serif',
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}
          >
            {subtitle}
          </Typography>
        )}

        {tags.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1, flexWrap: 'wrap' }}
          >
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 215, 0, 0.12)',
                  color: 'gold',
                  borderColor: 'rgba(255, 215, 0, 0.6)',
                }}
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            ))}
          </Stack>
        )}

        <Box>
          <Typography
            variant="caption"
            sx={{ color: 'rgba(255,255,255,0.6)' }}
          >
            {new Date(createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
