import React from 'react';

export const themes = {
  light: {
    foreground: '#000000',
    background: '#d3d3d3',
    note_border: '#ccccccc',
    note_background: '#ffffff',
    text_color: '#000000'
  },
  dark: {
    foreground: '#ffffff',
    background: '#2c2c2c',
    note_border: '#333333',
    note_background: '#000000',
    text_color: '#ffffff'
  },
};

export const ThemeContext = React.createContext(themes.light);