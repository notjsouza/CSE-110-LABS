import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from './themeContext';

function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <button onClick={toggleTheme}> Toggle Theme </button>
      <ClickCounter />
    </ThemeContext.Provider>
  );
}

export default ToggleTheme;

function ClickCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  const theme = useContext(ThemeContext);
  return (
    <div
      style={{
        background: theme.background,
        color: theme.foreground,
        padding: "20px",
      }}
    >
      <p>Clicks: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{background: theme.foreground, color: theme.background}}
      >
        Click me
      </button>
    </div>
  );
}