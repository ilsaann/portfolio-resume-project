import React from 'react';
import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// NOTE: complete, working component, but not imported/rendered by any page
// yet - a good fit for the gallery/about-me "public/private" toggle once
// those pages exist.
export default function PublicSwitch({
  checked = false,
  onChange,
  label = 'Public',
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        fontFamily: 'var(--font-italiana), serif',
      }}
    >
      <VisibilityOffIcon
        sx={{
          color: checked ? 'rgba(230, 210, 247, 0.35)' : 'rgba(230, 210, 247, 0.95)',
          fontSize: 22,
        }}
      />

      <FormControlLabel
        sx={{ m: 0 }}
        control={
          <Switch
            checked={checked}
            onChange={onChange}
            color="default"
          />
        }
        label={
          <Typography
            component="span"
            sx={{
              color: 'rgba(230, 210, 247, 0.95)',
              fontFamily: 'var(--font-italiana), serif',
              fontSize: 16,
            }}
          >
            {label}
          </Typography>
        }
      />

      <VisibilityIcon
        sx={{
          color: checked ? 'rgba(230, 210, 247, 0.95)' : 'rgba(230, 210, 247, 0.35)',
          fontSize: 22,
        }}
      />
    </Box>
  );
}