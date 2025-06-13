import { TranslationResult } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { updateOutputText } from "../../redux/features/translate/translateSlice";
import { useCallback, useEffect } from "react";

interface OutputProps {
    original: string, // fetched OR manually changed translation
    mainTranslation: string, // don't remove - TranslationResult's origin text isn't manually changed
    onOutputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onOutputReset: () => void,
    translationResult?: TranslationResult,
}

export default function Output({ translationResult, mainTranslation, onOutputReset}: OutputProps) {
    const dispatch = useAppDispatch();

    // Redux states
    const inputText = useAppSelector(state => state.translateSlice.inputText);
    const outputText = useAppSelector(state => state.translateSlice.outputText);

    const changeOutput = useCallback((value: string) => {
        dispatch(updateOutputText(value))
    }, [dispatch]);

    useEffect(() => {
        changeOutput(mainTranslation);
    }, [mainTranslation, changeOutput]);


    const handleAddTranslationClick = () => {
        const original = inputText.trim();
        const mainTranslation = outputText;
        dispatch({ type: "dictionarySlice/addTranslation", payload: {...translationResult, original, mainTranslation}} );
    }

    return (
        <div id="output-div" className="mt-4">
            <textarea id="output" value={outputText} onChange={(e) => changeOutput(e.currentTarget.value)}
                    className='block w-full min-h-22 bg-[#505050] hover:bg-[#606060] accent-orange-400 mt-4 mb-2 px-2 py-1 resize-none rounded-sm text-shadow-black-005rem'
                    />

            {/* buttons */}
            <div className="flex justify-end">
                <button onClick={onOutputReset} style={{textShadow: "black 0.08rem 0.08rem 0.05rem"}}
                    className='px-2 ml-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus-visible::outline-2 cursor-pointer rounded-sm'
                >Reset
                </button>

                <button onClick={handleAddTranslationClick} style={{textShadow: "black 0.08rem 0.08rem 0.05rem"}}
                    className='px-2 ml-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus-visible:outline-2 cursor-pointer rounded-sm'
                >Add
                </button>
            </div>

        </div>
    );
}