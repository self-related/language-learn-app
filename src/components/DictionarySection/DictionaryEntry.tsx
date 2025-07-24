import { useEffect, useRef, useState } from "react";
import { editTranslation, markLearned } from "@/src/redux/features/dictionary/dictionarySlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { ContextMenuData, TranslationResult } from "@/src/types";
import DictionaryContextMenu from "./DictionaryContextMenu";

interface DictionaryEntryProps {
    translation: TranslationResult,
    dictionary: string,
    setContextMenu?: React.Dispatch<React.SetStateAction<ContextMenuData | null>>
}

export default function DictionaryEntry({ translation, dictionary, setContextMenu }: DictionaryEntryProps) {
    const dispatch = useAppDispatch();
    
    
    // Redux global states 
    const hideTranslationsSetting = useAppSelector(state => state.dictionarySlice.hideTranslations);
    const allDictionaries = useAppSelector(state => state.dictionarySlice);

    // Local states
    const [hideTranslation, setHideTranslation] = useState(hideTranslationsSetting);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    

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

    const contextMenuActions = {
        edit: () => setIsEditing(isEditing => !isEditing),
    };
    

    const [sourceLang, targetLang] = translation.dictionaryName!.split(" - "); // get languages of the current dictionary



    // Refs
    const dictionaryEntryElement = useRef<null | HTMLLIElement>(null);

    

    // Effects
    useEffect(() => {
        setHideTranslation(hideTranslationsSetting);
    }, [hideTranslationsSetting, allDictionaries]); // allDictionaries - reset hiding translation state to global state, if word list was changed

    useEffect(() => {
        const currentDictionaryEntryElement = dictionaryEntryElement.current;

        const setContextMenuListener = (ev: MouseEvent) => {
            const x = ev.pageX;
            const y = ev.pageY;
            ev.preventDefault();
            setContextMenu!({x, y, contextMenuActions});
        };

        currentDictionaryEntryElement?.addEventListener("contextmenu", setContextMenuListener);

        return () => currentDictionaryEntryElement?.removeEventListener("contextmenu", setContextMenuListener);
    });
    


    // TEMP SOLUTION
    // ToDo: create separate components for return and wrap them

    const [original, setOriginal] = useState(translation.original);
    const [mainTranslation, setMainTranslation] = useState(translation.mainTranslation);

    const handleChangeButtonClick = () => {
        dispatch(editTranslation({...translation, original, mainTranslation, lastOriginal: translation.original!}));
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <li ref={dictionaryEntryElement}
                className={`flex bg-[#414343] px-3 py-2 rounded-sm ${translation.learned && "text-gray-400"}`}
            >


                {/* ToDo: 
                - Button to use current translation in input and output
                - Button to check other translations (if exist)  
                */}

                {/* original word + translation */}
                <div className="w-0 grow flex flex-col justify-around break-words">
                    {/* original word */}
                    <p className="">
                        <span className={`${translation.learned ? "text-green-200" : "text-red-300"}`}>
                            {sourceLang}:&nbsp;
                        </span>

                        <input 
                            type="text" value={original} 
                            onInput={(e) => setOriginal(e.currentTarget.value)} 
                            className="bg-white px-1.5 text-black"
                        />
                    </p>

                    {/* translation */}
                    <p className="break-words mt-1">
                        <span className={`${translation.learned ? "text-green-200" : "text-red-300"}`}>
                            {targetLang}:&nbsp;
                        </span>
                        
                        <span onClick={handleTranslationClick}
                            className={`${ hideTranslation ? "blur-xs" : "" } ${hideTranslationsSetting ? "cursor-pointer" : ""}`}
                        >

                        <input type="text" 
                            value={mainTranslation} 
                            onInput={(e) => setMainTranslation(e.currentTarget.value)}
                            className="bg-white px-1.5 text-black"
                        />

                        </span>
                    </p>

                    <button onClick={handleChangeButtonClick}
                        className="mt-2 w-fit px-0.5 bg-orange-600 hover:bg-orange-400 rounded-sm cursor-pointer" style={{textShadow: "black 0.05rem 0.05rem 0.05rem"}}
                    >Change</button>
                </div>
            </li>
        );
    }



    return (
    <li ref={dictionaryEntryElement}
        className={`flex bg-[#414343] px-3 py-2 rounded-sm ${translation.learned && "text-gray-400"}`}
    >


        {/* ToDo: 
        - Button to use current translation in input and output
        - Button to check other translations (if exist)  
        */}

        {/* original word + translation */}
        <div className="w-0 grow flex flex-col justify-around break-words">
            {/* original word */}
            <p className="">
                <span className={`${translation.learned ? "text-green-200" : "text-red-300"}`}>
                    {sourceLang}:&nbsp;
                </span>
               {translation?.original}
            </p>

            {/* translation */}
            <p className="break-words mt-1">
                <span className={`${translation.learned ? "text-green-200" : "text-red-300"}`}>
                    {targetLang}:&nbsp;
                </span>
                
                <span onClick={handleTranslationClick}
                    className={`${ hideTranslation ? "blur-xs" : "" } ${hideTranslationsSetting ? "cursor-pointer" : ""}`}
                >{translation?.mainTranslation}
                </span>
            </p>
        </div>

        
         {/* buttons */}
        <div className="w-min self-start">
            <button onClick={ () => handleRemoveButton(translation?.original) } 
                className="block text-red-500 rounded-sm h-6 aspect-square text-l cursor-pointer hover:bg-orange-300 active:bg-orange-900"
            >X
            </button>

            <button onClick={ handleMarkLearnedButton } 
                className={`block rounded-sm h-6 aspect-square text-l  cursor-pointer ${translation.learned ? "text-green-500 hover:bg-[#8dffab55] active:bg-[#275e36]" : "text-gray-400 hover:bg-[#6b6b6bd2] active:bg-[#27272755]"}  `}
            >✓
            </button>

            <button onClick={() => setShowDropdown(status => !status)} 
                className={`relative flex justify-center items-center rounded-sm h-6 aspect-square text-l text-center  cursor-pointer text-gray-400 hover:bg-[#6b6b6bd2] active:bg-[#27272755] has-[div:hover]:bg-transparent`}
            >
                <p style={{writingMode: "vertical-lr"}} className="text-center align-bottom w-3">...</p>

                {/* dropdown menu */}
                {
                    showDropdown && <DictionaryContextMenu />
                }

            </button>


        </div>
    </li>
    );
}