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
    const translateAutomatically = useAppSelector(state => state.settingsSlice.translateAutomatically);

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



// effects


    // auto-translation effect
    useEffect(() => {
        if (inputText !== "" && translateAutomatically)
            triggerQueryNew({ sourceLang: sourceLangRedux, targetLang: targetLangRedux, sourceText: inputText }, true);
    }, [translateAutomatically, sourceText, sourceLangRedux, targetLangRedux, triggerQueryNew, inputText]);


    // change main translation state on query response
    useEffect(() => {
        setMainTranslation(translationResult?.mainTranslation ?? "")
    }, [translationResult?.mainTranslation]);



    return (
        <section id="translate-section" className="md:w-[40%] w-[80%] md:min-w-[350px] mb-10">
            
            <h2 className='text-2xl mb-4'>Translate</h2>

            <LanguageSwitcher languages={languagesG} detectedLanguage={translationResult?.detectedLanguage} />

            <UserInput onInputChange={ (event) => setSourceText(event.target.value) }  onButtonClick={ () => triggerQueryNew({ sourceLang: sourceLangRedux, targetLang: targetLangRedux, sourceText: inputText }, true) } sourceText={sourceText} />

            <Output translationResult={translationResult} original={sourceText} mainTranslation={mainTranslation} onOutputChange={ (event) => setMainTranslation(event.currentTarget.value) } onOutputReset={ () => setMainTranslation(translationResult?.mainTranslation ?? "") } />
            
            <MoreTranslations otherTranslations={translationResult?.otherTranslations} onWordClick={ (event) => setMainTranslation(event.currentTarget.innerHTML) } />

        </section>

    );
}