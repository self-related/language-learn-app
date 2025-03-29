import { useEffect, useState } from "react";
import { useLazyTranslateGoogleQuery } from "../../redux/features/api/apiSlice";
import UserInput from "./UserInput";
import Output from "./Output";
import MoreOptions from "./MoreOptions";
import LanguageSwitcher from "./LanguageSwitcher";

export interface Languages {
    [key: string]: string;
}

// temp constant
const languages: Languages = {
    auto: "Auto",
    en: "English",
    "zh-CN": "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    cs: "Czech",
    eo: "Esperanto",
    nl: "Dutch",
    et: "Estonian",
    fi: "Finnish",
    ga: "Irish",
    it: "Italian",
    ja: "Japanese",
    kk: "Kazakh",
    ko: "Korean",
    la: "Latin",
    mn: "Mongolian",
    no: "Norwegian",
    pl: "Polish",
    ro: "Romanian",
    ru: "Russian",
    es: "Spanish",
    sv: "Swedish",
    th: "Thai",
    tr: "Turkish",
    uk: "Ukrainian"

};

export default function TranslateSection() {

// states
    const [autoTranslation, setAutoTranslation] = useState(true);

    const [sourceLang, setSourceLang] = useState("auto");
    const [targetLang, setTargetLang] = useState("en");
    const [sourceText, setSourceText] = useState("");

    

// local variables
    const [triggerQuery, {data}] = useLazyTranslateGoogleQuery();
    const translatedWord = data ? data[0][0][0] : "";



// callbacks
    const switchLangs = () => {
        if (sourceLang === "auto") {
            return;
        }
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
    };

    const handleUserInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSourceText(event.target.value);
    };

    const handleAutoTranslationCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) 
            setAutoTranslation(true);
        else 
            setAutoTranslation(false);
    };
    
    const handleTranslateButtonClick = () => {
        triggerQuery({ sourceLang, targetLang, sourceText }, true);
    };



// auto-translation effect
    useEffect(() => {
        if (sourceText !== "" && autoTranslation) {
            triggerQuery({ sourceLang, targetLang, sourceText }, true);
        }
    
    }, [autoTranslation, sourceText, sourceLang, targetLang, triggerQuery]);


    return (
        <div id="translate-section">
            
            <h2 className='font-medium text-center mb-4'>Add new words</h2>

            <LanguageSwitcher languages={languages} sourceLang={sourceLang} targetLang={targetLang} setSourceLang={setSourceLang} setTargetLang={setTargetLang} switchLangs={switchLangs} />

            <UserInput autoTranslation={autoTranslation} onInputChange={handleUserInputChange} onCheckboxChange={handleAutoTranslationCheckboxChange} onButtonClick={handleTranslateButtonClick} sourceText={sourceText} />

            <Output translatedWord={translatedWord} />
            
            <MoreOptions />

        </div>

    );
}