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

    return (
    <li className="flex justify-between items-center bg-[#414343] px-3 py-2 rounded-sm">
        <p className="max-w-[92%] break-words">
           <span className="text-red-300 block">{translation?.original}</span>
           {translation?.mainTranslation} 
        </p>
        <button onClick={ () => handleRemoveButton(translation?.original) } className=" text-red-500 ml-1.5 rounded-sm h-6 aspect-square text-l  cursor-pointer hover:bg-orange-300 active:bg-orange-900">X</button>
    </li>
    );
}