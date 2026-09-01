import React from 'react';


export const DarkAcademiaTheme = 
{
dark: {
    backgroundColor: '#033b6b',
    slate: '#8490a1',
    brick: '#540822',
    wood: '#633e09'
},
light: {
    backgroundColor: '#7a9ebd',
    slate: '#c5d0df',
    brick: '#87606e',
    wood: '#665b4b'
}
};

export const TurtleTheme = {
dark: {
    backgroundColor: '#244a39',
    leaf: '#244a39',
    sticks: '#735e4e',
    shell: '#594434'
},
light: {
    backgroundColor: '#c2ddd1',
    leaf: '#6b867a',
    sticks: '#ae9c8e',
    shell: '#7c7570'
},
};

// Jane's theme is the site's own existing look (the "more explore vibe but
// dark more green/blue" mood from Gallery.js's original comment) - kept as
// the default rather than inventing something new. Unlike
// DarkAcademiaTheme/TurtleTheme's bespoke per-theme color names above, this
// uses the canonical roles src/app/globals.css's --theme-* custom
// properties expect (background/surface/accent/textOnBackground/
// textOnSurface), since Jane is the theme actually wired up and in use
// today - see globals.css for where these get consumed.
export const JaneTheme = {
  dark: {
    background: '#133f47',
    surface: '#96b1b8f2',
    accent: 'rgba(162, 142, 188, 0.9)',
    textOnBackground: 'rgba(230, 210, 247, 0.9)',
    textOnSurface: 'rgb(54, 12, 27)',
  },
  light: {
    // Lighter counterpart in the same hue family, for a future light-mode
    // toggle - the live site today only ever renders the `dark` variant
    // above.
    background: '#c8dde1',
    surface: '#e4ecee',
    accent: 'rgba(162, 142, 188, 0.9)',
    textOnBackground: 'rgb(54, 12, 27)',
    textOnSurface: 'rgb(54, 12, 27)',
  },
};