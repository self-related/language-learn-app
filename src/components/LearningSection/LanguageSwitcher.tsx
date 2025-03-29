import { Languages } from "."

interface LanguageSwitcherProps {
    languages: Languages,
    sourceLang: string,
    targetLang: string,
    setSourceLang: React.Dispatch<React.SetStateAction<string>>,
    setTargetLang: React.Dispatch<React.SetStateAction<string>>,
    switchLangs: () => void
    
}


export default function LanguageSwitcher(props: LanguageSwitcherProps) {
const { languages, sourceLang, setSourceLang, targetLang, setTargetLang, switchLangs } = props;

  return (
    <div id="language-switcher" className="mx-auto w-max">

    <select name="current-lang" id="current-lang" value={sourceLang} className="cursor-pointer w-[6rem] text-center" onChange={(e) => setSourceLang(e.target.value)}>
        {
            Object.keys(languages).map((key) => (<option key={key} value={key}> {languages[key]} </option>))
        }
    </select>
    
    <button onClick={switchLangs} className="mx-2 cursor-pointer hover:bg-[#606060]">&lt;-&gt;</button>
    
    <select name="target-lang" id="target-lang" value={targetLang} className="cursor-pointer max-w-[6rem] text-center" onChange={(e) => setTargetLang(e.target.value)} >
        {
            Object.keys(languages).slice(1).map((key) => (<option key={key} value={key}>{languages[key]}</option>))
        }
    </select>
</div>

  )
}
