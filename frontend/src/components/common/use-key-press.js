// React
import React, { useEffect, useState, useRef } from 'react';


// https://stackoverflow.com/questions/42036865/react-how-to-navigate-through-list-by-arrow-keys
// https://codesandbox.io/s/react-hooks-navigate-list-with-keyboard-eowzo?file=/src/index.js

export default function useKeyPress(targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        // add event to refs instead of window (so only works if text box is selected maybe, otherwise window is fine)
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        }
        
    }, []);

    function downHandler({key}) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }
    
    function upHandler({key}) {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    }

    return keyPressed;
}