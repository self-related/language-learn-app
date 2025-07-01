import { TranslationResult } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setMainTranslation } from "../../redux/features/translate/translateSlice";
import { useCallback } from "react";

interface OutputProps {
    onOutputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onOutputReset: () => void,
    translationResult?: TranslationResult,
}

export default function Output({ translationResult, onOutputReset}: OutputProps) {
    const dispatch = useAppDispatch();

    // Redux states
    const original = useAppSelector(state => state.translateSlice.original);
    const mainTranslation = useAppSelector(state => state.translateSlice.mainTranslation);

    const handleChangeOutput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setMainTranslation(e.currentTarget.value));
    }, [dispatch]);


    const handleAddTranslationClick = () => {
        const originalTrimmed = original.trim();
        dispatch({ type: "dictionarySlice/addTranslation", payload: {...translationResult, original: originalTrimmed, mainTranslation}} );
    }

    return (
        <div id="output-div" className="mt-4">
            <textarea id="output" value={mainTranslation} onChange={handleChangeOutput}
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