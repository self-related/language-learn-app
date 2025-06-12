import { useEffect, useState } from "react";
import { markLearned } from "../../redux/features/dictionary/dictionarySlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { TranslationResult } from "../../types";

interface DictionaryEntryProps {
    translation: TranslationResult,
    dictionary: string,
}

export default function DictionaryEntry({ translation, dictionary }: DictionaryEntryProps) {
    const dispatch = useAppDispatch();
    
    
    // Redux global states 
    const hideTranslationsSetting = useAppSelector(state => state.settingsSlice.hideTranslations);
    const allDictionaries = useAppSelector(state => state.dictionarySlice);

    // Local states
    const [hideTranslation, setHideTranslation] = useState(hideTranslationsSetting);
    

    // Callbacks
    const handleRemoveButton = (original?: string) => {
        dispatch({type: "dictionarySlice/deleteTranslation", payload: {dictionary, original}});
    }

    const handleMarkLearnedButton = () => {
        dispatch(markLearned(translation));
    };

    const handleTranslationClick = () => {
        if (hideTranslationsSetting) {
            setHideTranslation(state => !state);
        }
    };
    

    const [sourceLang, targetLang] = translation.dictionaryName!.split(" - "); // get languages of the current dictionary

    

    // Effects
    useEffect(() => {
        setHideTranslation(hideTranslationsSetting);
    }, [hideTranslationsSetting, allDictionaries]); // allDictionaries - reset hiding translation state to global state, if word list was changed

    


    return (
    <li className={`flex flex-col relative items-start bg-[#414343] px-3 py-2 rounded-sm ${translation.learned && "text-gray-400"}`}>
        <button onClick={ () => handleRemoveButton(translation?.original) } 
            className="self-end absolute text-red-500 ml-1.5 rounded-sm h-6 aspect-square text-l  cursor-pointer hover:bg-orange-300 active:bg-orange-900"
        >X</button>

        <button onClick={ handleMarkLearnedButton } 
            className={`self-end absolute top-8  ml-1.5 rounded-sm h-6 aspect-square text-l  cursor-pointer ${translation.learned ? "text-green-500 hover:bg-[#8dffab55] active:bg-[#275e36]" : "text-gray-400 hover:bg-[#6b6b6bd2] active:bg-[#27272755]"}  `}
        >✓</button>

        {/* ToDo: 
        - Button to use current translation in input and output
        - Button to choose other translations (if exist)  
        */}

        <p className="max-w-[92%] break-words">
           <span className={`${translation.learned ? "text-green-200" : "text-red-300"}`}>{sourceLang}:&nbsp;</span>{translation?.original}
        </p>

        <p className="max-w-[92%] break-words mt-1">
            <span className={`${translation.learned ? "text-green-200" : "text-red-300"}`}>
                {targetLang}:&nbsp;
            </span>
            <span onClick={handleTranslationClick}
                className={`${ hideTranslation ? "blur-xs" : "" } ${hideTranslationsSetting ? "cursor-pointer" : ""}`}
            >{translation?.mainTranslation}
            </span>
        </p>
    </li>
    );
}