import { useEffect, useState } from "react";
import { useLazyTranslateGoogleQuery } from "../redux/features/api/apiSlice";

interface Languages {
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

export default function LearningSection() {

// states
    const [autoTranslation, setAutoTranslation] = useState(true);

    const [sourceLang, setSourceLang] = useState("auto");
    const [targetLang, setTargetLang] = useState("en");
    const [sourceText, setSourceText] = useState("");

    

// local variables
    const [triggerQuery, {data}] = useLazyTranslateGoogleQuery();
    const translatedWord = data ? data[0][0][0] : "";



// callbacks
    const handleAutoTranslateCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) 
            setAutoTranslation(true);
        else 
            setAutoTranslation(false);
    };

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
        <div id="learning-section">
            
            {/* Header */}
            <h2 className='font-medium text-center mb-4'
             >Add new words
            </h2>


            {/* Lang switcher */ }
            <div id="lang-switcher" className="mx-auto w-max">

                <select name="current-lang" id="current-lang" value={sourceLang} className="cursor-pointer w-[6rem] text-center" onChange={(e) => setSourceLang(e.target.value)}>
                    {
                        Object.keys(languages).map((key) => (<option key={key} value={key}> {languages[key]} </option>))
                    }
                </select>
                
                <button onClick={switchLangs} className="mx-2 cursor-pointer hover:bg-[#606060]">&lt;-&gt;</button>
                
                <select name="target-lang" id="target-lang" value={targetLang} className="cursor-pointer max-w-[6rem] text-center" onChange={(e) => setTargetLang(e.target.value)} >
                    {
                        Object.keys(languages).slice(1).map((key) => (<option key={key} value={key}>{languages[key]}</option>))
                    }
                </select>
            </div>


            {/* User Input */}
            <div id="input-div">
                <textarea id="user-input" placeholder='type a word or a phrase' value={sourceText} onChange={handleUserInputChange} 
                    className='block bg-[#505050] hover:bg-[#606060] accent-orange-400 mt-4 mb-2 px-2 py-1 w-[225px] resize-none rounded-sm'
                />
                <label htmlFor="auto-translate" className="block ml-auto mr-2 w-fit">
                    Translate automatically?
                    
                    <input id="auto-translate" type="checkbox" checked={autoTranslation} onChange={handleAutoTranslateCheckbox}
                        className="ml-2 accent-orange-500"
                    />
                </label>
                { 
                    autoTranslation == false 
                    ? <button onClick={handleTranslateButtonClick}
                        className='mt-1 px-2 block ml-auto bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus:outline-2 cursor-pointer rounded-sm'
                        >Translate
                      </button>
                    : ""
                }
            </div>


            {/* Output */}
            <div id="output-div" className="mt-4">
                <textarea id="output" value={translatedWord}
                    className='bg-[#505050] hover:bg-[#606060] accent-orange-400 my-2 px-2 py-1 min-h-[70px] h-min w-[225px] rounded-sm resize-none'
                />

                <button className='px-2 block ml-auto mr-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus:outline-2 cursor-pointer rounded-sm'
                 >Add
                </button>
            </div>
            

            {/* More options from translator api */}
            <div id="more-options">
                <h2 className="font-medium text-center mt-8"
                    >More options
                </h2>

                <div
                    className='bg-[#505050] my-2 px-2 py-1 min-h-[70px] h-min w-[225px] rounded-sm'
                >
                </div>
            </div>

        </div>

    );
}