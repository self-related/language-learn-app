import { useEffect } from "react";
import { useLazyTranslateGoogleNewQuery } from "../../redux/features/api/apiSlice";
import UserInput from "./UserInput";
import Output from "./Output";
import MoreTranslations from "./MoreTranslations";
import LanguageSwitcher from "./LanguageSwitcher";
import { handleGoogleApi } from "./utils";
import { languagesG } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setMainTranslation } from "../../redux/features/translate/translateSlice";


export default function TranslateSection() {

    // states
    const translateAutomatically = useAppSelector(state => state.translateSlice.translateAutomatically);


    // Redux global states
    const sourceLangRedux = useAppSelector(slice => slice.translateSlice.sourceLang);
    const targetLangRedux = useAppSelector(slice => slice.translateSlice.targetLang);
    const inputText = useAppSelector(state => state.translateSlice.original);

    const dispatch = useAppDispatch();


    // local variables
    const [triggerQueryNew, { data, isFetching, isError }] = useLazyTranslateGoogleNewQuery();
    const translationResult = handleGoogleApi(data, sourceLangRedux, targetLangRedux);



    // effects

    // auto-translation effect
    useEffect(() => {
        if (inputText !== "" && translateAutomatically)
            triggerQueryNew({ sourceLang: sourceLangRedux, targetLang: targetLangRedux, sourceText: inputText }, true);
    }, [translateAutomatically, sourceLangRedux, targetLangRedux, triggerQueryNew, inputText]);


    // change main translation state on query response
    useEffect(() => {
        dispatch(setMainTranslation(translationResult?.mainTranslation ?? ""));
    }, [translationResult?.mainTranslation, dispatch]);



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
            
            <Output translationResult={translationResult} onOutputChange={ (event) => setMainTranslation(event.currentTarget.value) } onOutputReset={ () => setMainTranslation(translationResult?.mainTranslation ?? "") } />
            
            <MoreTranslations otherTranslations={translationResult?.otherTranslations} onWordClick={ (event) => setMainTranslation(event.currentTarget.innerHTML) } />

        </section>

    );
}