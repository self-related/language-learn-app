import { useEffect, useState } from "react";
import { useLazyTranslateGoogleNewQuery } from "../../redux/features/api/apiSlice";
import UserInput from "./UserInput";
import Output from "./Output";
import MoreTranslations from "./MoreTranslations";
import LanguageSwitcher from "./LanguageSwitcher";
import { handleGoogleApi } from "./utils";
import { languagesG } from "../../consts";
import { useAppSelector } from "../../redux/store";


export default function TranslateSection() {

// states
    const [autoTranslation, setAutoTranslation] = useState(true);

    const [sourceText, setSourceText] = useState("");
    const [mainTranslation, setMainTranslation ] = useState<string>("");


    // Redux global states
    const sourceLangRedux = useAppSelector(slice => slice.settingsSlice.sourceLang);
    const targetLangRedux = useAppSelector(slice => slice.settingsSlice.targetLang);
    const inputText = useAppSelector(state => state.translateSlice.inputText);
    const outputText = useAppSelector(state => state.translateSlice.outputText);



// local variables
    const [triggerQueryNew, {data}] = useLazyTranslateGoogleNewQuery();
    const translationResult = handleGoogleApi(data, sourceLangRedux, targetLangRedux);

// callbacks

    const handleAutoTranslationCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) 
            setAutoTranslation(true);
        else 
            setAutoTranslation(false);
    };



// effects


    // auto-translation effect
    useEffect(() => {
        if (inputText !== "" && autoTranslation)
            triggerQueryNew({ sourceLang: sourceLangRedux, targetLang: targetLangRedux, sourceText: inputText }, true);
    }, [autoTranslation, sourceText, sourceLangRedux, targetLangRedux, triggerQueryNew, inputText]);


    // change main translation state on query response
    useEffect(() => {
        setMainTranslation(translationResult?.mainTranslation ?? "")
    }, [translationResult?.mainTranslation]);



    return (
        <section id="translate-section" className="md:w-[40%] w-[80%] md:min-w-[350px] mb-10">
            
            <h2 className='text-2xl mb-4'>Translate</h2>

            <LanguageSwitcher languages={languagesG} detectedLanguage={translationResult?.detectedLanguage} />

            <UserInput autoTranslation={autoTranslation} onInputChange={ (event) => setSourceText(event.target.value) } onCheckboxChange={handleAutoTranslationCheckboxChange} onButtonClick={ () => triggerQueryNew({ sourceLang: sourceLangRedux, targetLang: targetLangRedux, sourceText }, true) } sourceText={sourceText} />

            <Output translationResult={translationResult} original={sourceText} mainTranslation={mainTranslation} onOutputChange={ (event) => setMainTranslation(event.currentTarget.value) } onOutputReset={ () => setMainTranslation(translationResult?.mainTranslation ?? "") } />
            
            <MoreTranslations otherTranslations={translationResult?.otherTranslations} onWordClick={ (event) => setMainTranslation(event.currentTarget.innerHTML) } />

        </section>

    );
}