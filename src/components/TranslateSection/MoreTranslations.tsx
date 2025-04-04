import { OtherTranslations } from ".";

interface Props {
    otherTranslations: OtherTranslations[] | undefined
}

export default function MoreTranslations( {otherTranslations}: Props ) {
    const translations = otherTranslations?.map((trans, index) => (
        <li key={index}>
            {/* type of word (Noun, verb, etc) */}
            [{trans.pos.toUpperCase()}]:
            
            {/* translated words one by one */}
            {
                trans.translations.map((word, index) => (
                    <span key={"word-" + index}>
                        {index ? ", " : " "}
                        <span className="cursor-pointer hover:bg-gray-600 p-0.5 rounded-sm">{word}</span>
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
                    translations
                }
            </ol>
        </div>
    </div>
  );
}