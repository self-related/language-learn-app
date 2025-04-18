import { useEffect, useState } from "react";
import { useLazyTranslateGoogleNewQuery } from "../../redux/features/api/apiSlice";
import UserInput from "./UserInput";
import Output from "./Output";
import MoreTranslations from "./MoreTranslations";
import LanguageSwitcher from "./LanguageSwitcher";
import { handleGoogleApi } from "./utils";

export interface Languages {
    [key: string]: string;
}

export interface OtherTranslations {
    pos: string,
    translations: string[]
};

export interface TranslationResult {
    original?: string,
    mainTranslation?: string,
    otherTranslations?: OtherTranslations[],
    dictionaryName?: string,
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
    const [mainTranslation, setMainTranslation ] = useState<string>("");

    

// local variables
    const [triggerQueryNew, {data}] = useLazyTranslateGoogleNewQuery();
    const translationResult = handleGoogleApi(data);

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
        triggerQueryNew({ sourceLang, targetLang, sourceText }, true);
    };

    const handleOutputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMainTranslation(event.currentTarget.value);
    };

    const handleWordClick = (event: React.MouseEvent) => {
        setMainTranslation(event.currentTarget.innerHTML);
    };

    const handleOutputReset = () => {
        setMainTranslation(translationResult?.mainTranslation ?? "");
    };


// auto-translation effect
    useEffect(() => {
        if (sourceText !== "" && autoTranslation) {
            triggerQueryNew({ sourceLang, targetLang, sourceText }, true);
        }
    
    }, [autoTranslation, sourceText, sourceLang, targetLang, triggerQueryNew]);

// change main translation state on query response
    useEffect(() => {
        setMainTranslation(translationResult?.mainTranslation ?? "")
    }, [translationResult?.mainTranslation]);

// ToDo: 
    return (
        <section id="translate-section" className="w-[60%] md:w-[30%] mb-10">
            
            <h2 className='text-2xl mb-4'>Translate</h2>

            <LanguageSwitcher languages={languages} sourceLang={sourceLang} targetLang={targetLang} setSourceLang={setSourceLang} setTargetLang={setTargetLang} switchLangs={switchLangs} />

            <UserInput autoTranslation={autoTranslation} onInputChange={handleUserInputChange} onCheckboxChange={handleAutoTranslationCheckboxChange} onButtonClick={handleTranslateButtonClick} sourceText={sourceText} />

            <Output translationResult={{...translationResult, dictionaryName: `${languages[sourceLang]} - ${languages[targetLang]}`}} mainTranslation={mainTranslation} onOutputChange={handleOutputChange} onOutputReset={handleOutputReset} />
            
            <MoreTranslations otherTranslations={translationResult?.otherTranslations} onWordClick={handleWordClick} />

        </section>

    );
}