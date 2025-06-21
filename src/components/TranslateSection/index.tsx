import { useEffect, useState } from "react";
import { useLazyTranslateGoogleNewQuery, useLazyTranslationResultQuery } from "../../redux/features/api/apiSlice";
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

    // const [sourceText, setSourceText] = useState("");
    const [mainTranslation, setMainTranslation ] = useState<string>("");


    // Redux global states
    const sourceLangRedux = useAppSelector(slice => slice.settingsSlice.sourceLang);
    const targetLangRedux = useAppSelector(slice => slice.settingsSlice.targetLang);
    const inputText = useAppSelector(state => state.translateSlice.inputText);



    // local variables
    const [triggerQueryNew, {data, isFetching, isError}] = useLazyTranslateGoogleNewQuery(); // deprecate and remove
    const translationResult = handleGoogleApi(data, sourceLangRedux, targetLangRedux); // deprecate and remove

    const [triggerFetchTranslation, /* { data, isFetching, isError } */] = useLazyTranslationResultQuery(); // new

    // auto-translation effect
    useEffect(() => {
        if (inputText !== "" && translateAutomatically) {
            triggerQueryNew({ sourceLang: sourceLangRedux, targetLang: targetLangRedux, sourceText: inputText }, true); // Deprecate and remove
            triggerFetchTranslation({ sourceLang: sourceLangRedux, targetLang: targetLangRedux, sourceText: inputText }, true); // new, transformed and ready to use
        }
    }, [translateAutomatically, sourceLangRedux, targetLangRedux, triggerQueryNew, inputText, triggerFetchTranslation]);

    // change main translation state on query response
    useEffect(() => {
        setMainTranslation(translationResult?.mainTranslation ?? "")
    }, [translationResult?.mainTranslation]);



    return (
        <section id="translate-section" className="md:w-[40%] w-[80%] md:min-w-[350px] mb-10">
            
            <h2 className='text-2xl mb-4'>Translate</h2>

            <LanguageSwitcher languages={languagesG} detectedLanguage={translationResult?.detectedLanguage} />

            <UserInput  onButtonClick={ () => triggerQueryNew({ sourceLang: sourceLangRedux, targetLang: targetLangRedux, sourceText: inputText }, true) } />

            {
                isFetching && (
                    <p>Loading...</p>
                )
            }

            {
                isError && (
                    <p className="text-red-500">Error, try again</p>
                )
            }
            
            <Output translationResult={translationResult} original={inputText} mainTranslation={mainTranslation} onOutputChange={ (event) => setMainTranslation(event.currentTarget.value) } onOutputReset={ () => setMainTranslation(translationResult?.mainTranslation ?? "") } />
            
            <MoreTranslations otherTranslations={translationResult?.otherTranslations} onWordClick={ (event) => setMainTranslation(event.currentTarget.innerHTML) } />

        </section>

    );
}