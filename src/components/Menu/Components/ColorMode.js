import React from "react";

export const ColorModeContext = React.createContext({
    mode: "",
    setMode: () => { alert("Você precisa me configurar primeiro!") },
    toggleMode: () => { alert("Você precisa me configurar primeiro!") }
});

export default function ColorModeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode)

    function toggleMode() {
        if (mode === "light") setMode("dark")
        else setMode("light")
    }

    return (
        <ColorModeContext.Provider value={{mode: mode, setMode: setMode, toggleMode: toggleMode}}>
            {props.children}
        </ColorModeContext.Provider>
    )
};