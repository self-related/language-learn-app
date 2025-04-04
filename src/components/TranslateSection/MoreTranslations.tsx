import { OtherTranslations } from ".";

interface Props {
    otherTranslations: OtherTranslations[] | undefined
}

export default function MoreTranslations( {otherTranslations}: Props ) {
    const translationsList = otherTranslations?.map((entry, index) => (
        <li key={index} className="mb-2">
            {/* type of word (Noun, verb, etc) */}
            <span className="text-white bg-orange-500 px-1 py-0.5 rounded-sm">{entry.pos}s:</span>
            
            {/* nested list of translated words one by one */}
            {
                entry.translations.map((word, index) => (
                    <span key={"word-" + index}>
                        {index ? ", " : " "}
                        <span className="cursor-pointer bg-[#414343] hover:bg-gray-600 p-1 ml-1 rounded-sm leading-8">{word}</span>
                    </span>
                ))
            }
        </li>
    ));




  return (
    <div id="more-translations">
        <h2 className="font-medium text-center mt-8">More Translations
        </h2>

        <div
            className='bg-[#505050] my-2 px-2 py-1 min-h-[70px] h-min w-[225px] rounded-sm'
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