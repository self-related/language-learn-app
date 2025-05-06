import { TranslationResult } from "../../types";
import { useAppDispatch } from "../../redux/store";

interface OutputProps {
    original: string, // don't remove - TranslationResult's origin text isn't manually changed
    mainTranslation: string, // don't remove - TranslationResult's origin text isn't manually changed
    onOutputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onOutputReset: () => void,
    translationResult?: TranslationResult,
}

export default function Output({ translationResult, original, mainTranslation, onOutputChange, onOutputReset}: OutputProps) {
    const dispatch = useAppDispatch();
    const handleAddTranslationClick = () => {
        original = original.trim();
        dispatch({ type: "dictionarySlice/addTranslation", payload: {...translationResult, original, mainTranslation}} );
    }

    return (
        <div id="output-div" className="mt-4">
            <textarea id="output" value={mainTranslation} onChange={onOutputChange}
                    className='block w-full min-h-22 bg-[#505050] hover:bg-[#606060] accent-orange-400 mt-4 mb-2 px-2 py-1 resize-none rounded-sm text-shadow-black-005rem'
                    />

            {/* buttons */}
            <div className="flex justify-end">
                <button onClick={onOutputReset}
                    className='px-2 ml-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus-visible::outline-2 cursor-pointer rounded-sm'
                >Reset
                </button>

                <button onClick={handleAddTranslationClick}
                    className='px-2 ml-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus-visible:outline-2 cursor-pointer rounded-sm'
                >Add
                </button>
            </div>

        </div>
    );
}