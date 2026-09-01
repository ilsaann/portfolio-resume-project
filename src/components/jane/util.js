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

// TODO: JaneTheme has no actual colors yet, unlike DarkAcademiaTheme/TurtleTheme
// above - but it's the *default* themeOption in both CreateNewGalleryForm.js
// and Gallery.js, so anything using the default theme today gets no styling
// from this. None of the three theme objects in this file are imported
// anywhere yet either - the theming system is designed but unwired.
export const JaneTheme = {
dark: {},
light: {},
}