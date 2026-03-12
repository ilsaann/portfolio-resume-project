"use client";

import { useState } from "react";
import {
  Box,
  Card as MUICard,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

export default function Card({ header, content, media, bullets = [],}) {
  const [expanded, setExpanded] = useState(false);
  const image = media?.[0]?.image;

  const onCardClick = () => {
    setExpanded((prev) => !prev);
  };

  const renderBullets = () => {
    if (!bullets || bullets.length === 0) return null;

    return bullets.map((bullet, index) => (
      <Typography
        key={index}
        variant="body2"
        color="text.secondary"
        sx={{ mt: index === 0 ? 1 : 0.5, fontFamily: 'var(--font-italiana), serif !important', fontWeight: 600}}
      >
        • {bullet}
      </Typography>
    ));
  };

  const cardBackgroundColor = expanded ? 'rgba(171, 153, 186, 0.92)' : 'rgba(150, 177, 184, 0.92)'; 

 const renderCardMedia = (media) => {
  if (!media || media.length === 0) return null;

  return (
    <Box sx={{ 
      height: 180, 
      overflowX: 'auto',   
      backgroundColor: '#96b1b8f2',  // glass green background
        
        /* Custom scrollbar colors to match card */
        scrollbarColor: '#133f47 #96b1b8f2',  // thumb color, track color
        scrollbarWidth: 'thin',
        
        /* Webkit scrollbar styling for Chrome/Safari */
        '&::-webkit-scrollbar': {
          height: '6px'
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#96b1b8f2',  // matches card bg
          borderRadius: '3px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#133f47',    // slightly darker glass green
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#6b9aa8'     // darker on hover
        } }}>
      <Stack direction="row" spacing={1} sx={{ minWidth: 'max-content' }}>
        {media.map((item, index) => (
          <CardMedia
            key={index}
            component="img"
            sx={{ width: 200, height: 180, flexShrink: 0, objectFit: 'cover' }}
            image={item.image}
            alt={item.title || `Media ${index + 1}`}
          />
        ))}
      </Stack>
    </Box>
  );
};


  return (
    <MUICard sx={{ width: '345px !important', backgroundColor: cardBackgroundColor, fontFamily: 'var(--font-italiana), serif !important', fontWeight: 600,
    }}
       onClick={onCardClick}
       >
      {image && (
        renderCardMedia(media)
      )}
      <CardContent sx={{fontFamily: 'var(--font-italiana), serif !important', fontWeight: 600}}  >
        <Typography gutterBottom variant="h6" component="div" sx={{fontFamily: 'var(--font-italiana), serif !important', fontWeight: 600}}>
          {header}
        </Typography>
        {/* when NOT expanded, show summary; when expanded, show bullets instead */}
        {!expanded ? (
          <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'var(--font-italiana), serif !important', fontWeight: 600}}>
            {content}
          </Typography>
        ) : (
          renderBullets()
        )}
      </CardContent>
    </MUICard>
  );
}
