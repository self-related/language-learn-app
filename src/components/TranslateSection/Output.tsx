import { TranslationResult } from ".";
import { useAppDispatch } from "../../redux/store";

interface OutputProps {
    mainTranslation: string, // ToDo: remove in favor of TranslationResult
    onOutputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onOutputReset: () => void,
    translationResult?: TranslationResult,
}

export default function Output({ translationResult, mainTranslation, onOutputChange, onOutputReset}: OutputProps) {
    const dispatch = useAppDispatch();

    return (
    <div id="output-div" className="mt-4">
        <textarea id="output" value={mainTranslation} onChange={onOutputChange}
                className='block w-full min-h-22 bg-[#505050] hover:bg-[#606060] accent-orange-400 mt-4 mb-2 px-2 py-1 resize-none rounded-sm'
                />

        {/* buttons */}
        <div className="flex justify-end">
            <button onClick={onOutputReset}
                className='px-2 ml-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus-visible::outline-2 cursor-pointer rounded-sm'
            >Reset
            </button>

            <button onClick={() => dispatch({type: "dictionarySlice/addTranslation", payload: translationResult})}
                className='px-2 ml-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus-visible:outline-2 cursor-pointer rounded-sm'
            >Add
            </button>
        </div>

    </div>
    );
}