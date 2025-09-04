import { OtherTranslations } from "@/src/types";

interface Props {
    otherTranslations: OtherTranslations[] | undefined,
    onWordClick: (event: React.MouseEvent) => void
}

export default function MoreTranslations( {otherTranslations, onWordClick}: Props ) {
    const translationsList = otherTranslations?.map((entry, index) => (
        <li key={index} className="flex flex-wrap items-center gap-x-1 gap-y-2 mb-3 w-full text-shadow-black-005rem">
                
                {/* type of word (Noun, verb, etc) */}
            <p className="text-white bg-orange-500 px-1 py-0.5 rounded-sm" style={{textShadow: "black 0.07rem 0.07rem 0.07rem"}}>{entry.pos}s:</p>
            
                {/* nested list of translated words one by one */}
            {
                entry.translations.map((word, index) => (
                    <button key={"word-" + index} onClick={onWordClick} className="cursor-pointer bg-[#414343] hover:bg-gray-600 p-1 ml-1 rounded-md text-shadow-black-005rem">{word}</button>
                ))
            }
        </li>
    ));


  return (
    <div id="more-translations">
        <h2 className="font-medium mt-8">More Translations
        </h2>

        <div
            className='block w-full min-h-30 max-h-48 overflow-y-scroll bg-[#505050] accent-orange-400 mt-1 px-2 py-1 resize-none rounded-sm'
        >
            <ol>
                {
                    translationsList
                }
            </ol>
        </div>
    </div>
  );
}