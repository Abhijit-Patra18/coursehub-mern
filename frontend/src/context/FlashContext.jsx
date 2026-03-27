import { createContext, useState } from "react";

export const FlashContext = createContext();

export function FlashProvider({ children }) {

    const [flash, setFlash] = useState({
        show: false,
        message: "",
        type: "success"
    });

    const showFlash = (message, type = "success") => {
        setFlash({ show: true, message, type });

        setTimeout(() => {
            setFlash({ show: false, message: "", type: "success" });
        }, 4000);
    };

    return (
        <FlashContext.Provider value={{ flash, showFlash }}>
            {children}
        </FlashContext.Provider>
    );
}