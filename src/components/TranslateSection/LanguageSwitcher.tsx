import { setSourceLang, setTargetLang } from "@/src/redux/features/translate/translateSlice";
import { swapInputOutputText } from "@/src/redux/features/translate/translateSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { Languages } from "@/src/types";

interface LanguageSwitcherProps {
    languages: Languages, // change to get from current API maybe
    detectedLanguage?: string
}


export default function LanguageSwitcher(props: LanguageSwitcherProps) {
    const { languages, detectedLanguage } = props;
    const detectedLanguageName = detectedLanguage ? ` (${languages[detectedLanguage]})` : "";

    // Redux hooks
    const dispatch = useAppDispatch();

    // Redux global states
    const sourceLangRedux = useAppSelector(slice => slice.translateSlice.sourceLang);
    const targetLangRedux = useAppSelector(slice => slice.translateSlice.targetLang);


    // callbacks

    const switchLangs = () => {
        if (sourceLangRedux === "auto" && detectedLanguage) {
            dispatch(setSourceLang(targetLangRedux));
            dispatch(setTargetLang(detectedLanguage));
        } else {
            dispatch(setSourceLang(targetLangRedux));
            dispatch(setTargetLang(sourceLangRedux));
        }

        dispatch(swapInputOutputText());

        // TODO: swap input and output
    };

    
    return (
        <div id="language-switcher" className="flex w-full justify-between">

            <select name="current-lang" id="current-lang" value={sourceLangRedux}  onChange={(e) => dispatch(setSourceLang(e.target.value))}
                    className="cursor-pointer p-2 grow w-0 bg-[#505050] hover:bg-[#606060] rounded-sm" style={{textShadow: "black 0.08rem 0.08rem 0.05rem"}}>
                {
                    Object.keys(languages).map((key) => (
                        <option key={key} value={key}> {`${languages[key]}${key == "auto" ? detectedLanguageName : ""}`} </option>
                    ))
                }
            </select>
            
            <button onClick={switchLangs} className="mx-2 min-w-max cursor-pointer hover:bg-[#606060] p-1 rounded-sm">&lt;-&gt;</button>
            
            <select name="target-lang" id="target-lang" value={targetLangRedux} onChange={(e) => dispatch(setTargetLang(e.target.value))}
                    className="cursor-pointer p-2 grow w-0 bg-[#505050] hover:bg-[#606060] rounded-sm" style={{textShadow: "black 0.08rem 0.08rem 0.05rem"}}>
                {
                    Object.keys(languages).slice(1).map((key) => (<option key={key} value={key}>{languages[key]}</option>))
                }
            </select>
        </div>
  )
}
