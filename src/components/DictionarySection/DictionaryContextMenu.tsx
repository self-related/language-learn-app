import { setTranslateAutomatically } from "../../redux/features/settings/settingsSlice";
import { updateInputText, updateOutputText, updateTranslationResult } from "../../redux/features/translate/translateSlice";
import { useAppDispatch } from "../../redux/store";
import { TranslationResult } from "../../types";

interface Props {
    className?: string,
    x?: number,
    y?: number,
    translation?: TranslationResult,
}

export default function DictionaryContextMenu({className, x, y, translation}: Props) {
    // Redux
    const dispatch = useAppDispatch();



    // Callbacks

    const setInputAndOutput = () => { // set data for translation section with provided data
        dispatch(updateInputText(translation?.original ?? ""));
        dispatch(updateOutputText(translation?.mainTranslation ?? ""));
        dispatch(setTranslateAutomatically(false));
        dispatch(updateTranslationResult(translation));
    };

    return (
        <div className={`${className} flex items-center gap-2 w-max rounded-sm bg-[#656565] text-white text-sm cursor-pointer`} style={{top: y, left: x}}>
            <p onClick={setInputAndOutput} 
                className="px-1.5 py-1 rounded-sm hover:bg-[#808080] active:bg-[#505050]"
            >
                change
            </p>
            <p className="px-1.5 py-1 rounded-sm hover:bg-[#808080] active:bg-[#505050]">
                reverse
            </p>
        </div>
    );
}