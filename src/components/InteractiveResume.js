import React from 'react';
import styles from '../app/styles/Resume.module.css';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Stack, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Card from './Card';

// Extracted from the original hardcoded resume/page.js so any member page
// can render the same "Skills accordion + Experience cards" layout by
// passing their own data, instead of copy-pasting the JSX per member.
// `skills` items: { id, label, content }. `experience` items match Card's
// expected shape: { title, company, dates, summary, bullets, media }.

const centeredSummarySx = {
  justifyContent: "center",
  "& .MuiAccordionSummary-content": {
    justifyContent: "center",
    width: "100%",
    m: 0,
    fontFamily: 'var(--font-italiana), serif !important',
    fontWeight: 600,
    background: 'var(--theme-surface)',
  },
  "& .MuiAccordionSummary-content > *": {
    textAlign: "center",
    m: 0,
    fontFamily: 'var(--font-italiana), serif !important',
    fontWeight: 600,
    background: 'var(--theme-surface)',
  },
};

const accordionTypographySx = {
  fontFamily: 'var(--font-italiana), serif !important',
  fontWeight: 600,
  color: 'var(--theme-text-on-surface)',
  WebkitTextStroke: '.5px rgba(168, 140, 200, 0.9)',
  paintOrder: 'stroke fill',
  fontSize: { xs: '14px', sm: '16px' },
  padding: '4px 8px',
};

const acoordionDetailsSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px',
};

const accordionSx = {
  width: '100%',
  fontFamily: 'var(--font-italiana), serif !important',
  background: 'var(--theme-surface)',
  margin: 0,
};

export default function InteractiveResume({ skills = [], experience = [] }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: 4, padding: 4, width: 'fit-content', maxWidth: '95%', backgroundColor: '#ffffff40', borderRadius: '10px' }}>
      {skills.length > 0 && (
        <Box className={styles.skills} sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" sx={{ fontFamily: 'var(--font-italiana), serif !important', fontWeight: 600, color: 'var(--theme-text-on-surface)', WebkitTextStroke: '.5px rgba(168, 140, 200, 0.9)', paintOrder: 'stroke fill' }}>Skills</Typography>

          {skills.map((skill, index) => (
            <Accordion
              key={skill.id}
              disableGutters
              square
              className="glowOnHoverGold"
              sx={{
                ...accordionSx,
                ...(index === 0 && { borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }),
                ...(index === skills.length - 1 && { borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }),
              }}
            >
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls={`${skill.id}-content`}
                id={`${skill.id}-header`}
                sx={centeredSummarySx}
              >
                <Typography>{skill.label}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={acoordionDetailsSx}>
                <Typography sx={accordionTypographySx}>
                  {skill.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}

          <Divider />
        </Box>
      )}

      {experience.length > 0 && (
        <Box className={styles.experienceBox} sx={{
          overflowX: 'auto',
          scrollbarColor: 'var(--theme-background) #ffffff40',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            height: '6px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#ffffff40',
            borderRadius: '3px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--theme-background)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#6b9aa8'
          }
        }}>
          <Typography variant="h4" sx={{
            fontFamily: 'var(--font-italiana), serif !important',
            fontWeight: 600,
            color: 'var(--theme-text-on-surface)',
            WebkitTextStroke: '.5px rgba(168, 140, 200, 0.9)',
            paintOrder: 'stroke fill',
            marginTop: '24px'
          }}>Experience</Typography>
          <Stack direction="row" spacing={1} className={styles.experienceCards}>
            {experience.map((item) => (
              <Card
                key={item.title}
                media={item.media ?? []}
                content={item.summary}
                header={`${item.title} at ${item.company} | (${item.dates})`}
                bullets={item.bullets}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
