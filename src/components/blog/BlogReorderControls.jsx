// components/blog/BlogReorderControls.jsx
'use client';

import { Box, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function BlogReorderControls({
  index,
  total,
  onMoveUp,
  onMoveDown,
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 1,
        mt: 0.5,
      }}
    >
      <IconButton
        size="small"
        onClick={onMoveUp}
        disabled={isFirst}
        sx={{ color: 'gold' }}
      >
        <ArrowUpwardIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="small"
        onClick={onMoveDown}
        disabled={isLast}
        sx={{ color: 'gold' }}
      >
        <ArrowDownwardIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}

