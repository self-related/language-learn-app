import { Languages } from "../../types";

interface LanguageSwitcherProps {
    languages: Languages,
    sourceLang: string,
    targetLang: string,
    setSourceLang: React.Dispatch<React.SetStateAction<string>>,
    setTargetLang: React.Dispatch<React.SetStateAction<string>>,
    switchLangs: () => void,
    detectedLanguage?: string
    
}


export default function LanguageSwitcher(props: LanguageSwitcherProps) {
    const { languages, sourceLang, setSourceLang, targetLang, setTargetLang, detectedLanguage, switchLangs } = props;
    const detectedLanguageName = detectedLanguage ? ` (${languages[detectedLanguage]})` : "";

    
    return (
        <div id="language-switcher" className="flex w-full justify-between">

            <select name="current-lang" id="current-lang" value={sourceLang}  onChange={(e) => setSourceLang(e.target.value)}
                    className="cursor-pointer p-2 grow w-0 bg-[#505050] hover:bg-[#606060] rounded-sm">
                {
                    Object.keys(languages).map((key) => (
                        <option key={key} value={key}> {`${languages[key]}${key == "auto" ? detectedLanguageName : ""}`} </option>
                    ))
                }
            </select>
            
            <button onClick={switchLangs} className="mx-2 min-w-max cursor-pointer hover:bg-[#606060] p-1 rounded-sm">&lt;-&gt;</button>
            
            <select name="target-lang" id="target-lang" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}
                    className="cursor-pointer p-2 grow w-0 bg-[#505050] hover:bg-[#606060] rounded-sm">
                {
                    Object.keys(languages).slice(1).map((key) => (<option key={key} value={key}>{languages[key]}</option>))
                }
            </select>
        </div>
  )
}
