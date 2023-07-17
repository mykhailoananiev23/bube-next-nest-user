import { createContext, useState } from "react"

const initVal = {
    Language: "en",
    setLanguage: () => {}
};
interface LanguageContextProps {
    Language: String,
    setLanguage: Function
}

export const LanguageContext = createContext<LanguageContextProps>(initVal)

const LanguageContextProvider = ({children}: any) => {
    const [Language, setLanguage] = useState<string>(initVal.Language);
    return (
        <LanguageContext.Provider value={{Language, setLanguage}}>
            {
                children
            }
        </LanguageContext.Provider>
    )
}
export default LanguageContextProvider;