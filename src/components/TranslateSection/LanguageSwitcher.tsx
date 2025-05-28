import { setSourceLang, setTargetLang } from "../../redux/features/settings/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Languages } from "../../types";

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
    const sourceLangRedux = useAppSelector(slice => slice.settingsSlice.sourceLang);
    const targetLangRedux = useAppSelector(slice => slice.settingsSlice.targetLang);


    // callbacks

    const switchLangs = () => {
        if (sourceLangRedux === "auto" && detectedLanguage) {
            dispatch(setSourceLang(targetLangRedux));
            dispatch(setTargetLang(detectedLanguage));

        } else {
            dispatch(setSourceLang(targetLangRedux));
            dispatch(setTargetLang(sourceLangRedux));
        }

        // TODO: swap input and output
    };

    
    return (
        <div id="language-switcher" className="flex w-full justify-between">

            <select name="current-lang" id="current-lang" value={sourceLangRedux}  onChange={(e) => dispatch(setSourceLang(e.target.value))}
                    className="cursor-pointer p-2 grow w-0 bg-[#505050] hover:bg-[#606060] rounded-sm">
                {
                    Object.keys(languages).map((key) => (
                        <option key={key} value={key}> {`${languages[key]}${key == "auto" ? detectedLanguageName : ""}`} </option>
                    ))
                }
            </select>
            
            <button onClick={switchLangs} className="mx-2 min-w-max cursor-pointer hover:bg-[#606060] p-1 rounded-sm">&lt;-&gt;</button>
            
            <select name="target-lang" id="target-lang" value={targetLangRedux} onChange={(e) => dispatch(setTargetLang(e.target.value))}
                    className="cursor-pointer p-2 grow w-0 bg-[#505050] hover:bg-[#606060] rounded-sm">
                {
                    Object.keys(languages).slice(1).map((key) => (<option key={key} value={key}>{languages[key]}</option>))
                }
            </select>
        </div>
  )
}
