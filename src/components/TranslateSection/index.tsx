import { useEffect, useState } from "react";
import { useLazyTranslateGoogleNewQuery } from "../../redux/features/api/apiSlice";
import UserInput from "./UserInput";
import Output from "./Output";
import MoreTranslations from "./MoreTranslations";
import LanguageSwitcher from "./LanguageSwitcher";
import { handleGoogleApi } from "./utils";
import { languagesG } from "../../consts";


export default function TranslateSection() {

// states
    const [autoTranslation, setAutoTranslation] = useState(true);
    const [sourceLang, setSourceLang] = useState("auto");
    const [targetLang, setTargetLang] = useState("es");
    const [sourceText, setSourceText] = useState("");
    const [mainTranslation, setMainTranslation ] = useState<string>("");



// local variables
    const [triggerQueryNew, {data}] = useLazyTranslateGoogleNewQuery();
    const translationResult = handleGoogleApi(data, sourceLang, targetLang);



// callbacks
    const switchLangs = () => {
        if (sourceLang === "auto" && translationResult?.detectedLanguage) {
            setSourceLang(targetLang);
            setTargetLang(translationResult?.detectedLanguage);

        } else {
            setSourceLang(targetLang);
            setTargetLang(sourceLang);
        }
    };

    const handleAutoTranslationCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) 
            setAutoTranslation(true);
        else 
            setAutoTranslation(false);
    };



// effects


    // auto-translation effect
    useEffect(() => {
        if (sourceText !== "" && autoTranslation)
            triggerQueryNew({ sourceLang, targetLang, sourceText }, true);
    }, [autoTranslation, sourceText, sourceLang, targetLang, triggerQueryNew]);


    // change main translation state on query response
    useEffect(() => {
        setMainTranslation(translationResult?.mainTranslation ?? "")
    }, [translationResult?.mainTranslation]);



    return (
        <section id="translate-section" className="w-[60%] md:w-[30%] mb-10">
            
            <h2 className='text-2xl mb-4'>Translate</h2>

            <LanguageSwitcher languages={languagesG} sourceLang={sourceLang} targetLang={targetLang} detectedLanguage={translationResult?.detectedLanguage} setSourceLang={setSourceLang} setTargetLang={setTargetLang} switchLangs={switchLangs} />

            <UserInput autoTranslation={autoTranslation} onInputChange={ (event) => setSourceText(event.target.value) } onCheckboxChange={handleAutoTranslationCheckboxChange} onButtonClick={ () => triggerQueryNew({ sourceLang, targetLang, sourceText }, true) } sourceText={sourceText} />

            <Output translationResult={translationResult} mainTranslation={mainTranslation} onOutputChange={ (event) => setMainTranslation(event.currentTarget.value) } onOutputReset={ () => setMainTranslation(translationResult?.mainTranslation ?? "") } />
            
            <MoreTranslations otherTranslations={translationResult?.otherTranslations} onWordClick={ (event) => setMainTranslation(event.currentTarget.innerHTML) } />

        </section>

    );
}