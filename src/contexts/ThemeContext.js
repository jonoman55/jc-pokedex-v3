import { useState, createContext, useContext } from 'react';

const ThemeContext = createContext({
    theme: false,
});

export const ThemeContextProvider = (props) => {
    const [theme, setTheme] = useState(true);
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);