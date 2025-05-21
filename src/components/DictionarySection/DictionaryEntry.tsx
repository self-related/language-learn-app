import { useAppDispatch } from "../../redux/store";
import { TranslationResult } from "../../types";

interface DictionaryEntryProps {
    translation: TranslationResult,
    key: number,
    dictionary: string,
}

export default function DictionaryEntry({ translation, dictionary }: DictionaryEntryProps) {
    const dispatch = useAppDispatch();

    const handleRemoveButton = (original?: string) => {
        dispatch({type: "dictionarySlice/deleteTranslation", payload: {dictionary, original}});
    }

    const [sourceLang, targetLang] = translation.dictionaryName!.split(" - "); // get languages of the current dictionary

    

    return (
    <li className="flex flex-col relative items-start bg-[#414343] border-2 px-3 py-2 rounded-sm">
        <button onClick={ () => handleRemoveButton(translation?.original) } 
            className="self-end absolute text-red-500 ml-1.5 rounded-sm h-6 aspect-square text-l  cursor-pointer hover:bg-orange-300 active:bg-orange-900"
        >X</button>

        {/* ToDo: 
        - Button to use current translation in both inputs
        - Button to choose other translations (if exist)  
        */}

        <p className="max-w-[92%] break-words">
           <span className="text-red-300">{sourceLang}:&nbsp;</span>{translation?.original}
        </p>

        <p className="max-w-[92%] break-words mt-1">
            <span className="text-red-300">{targetLang}:&nbsp;</span>{translation?.mainTranslation}
        </p>
        {
            translation.learned && <p>Learned!</p>
        }
    </li>
    );
}