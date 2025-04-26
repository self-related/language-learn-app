import { useState } from "react";
import { useAppSelector } from "../../redux/store";
import DictionaryEntry from "./DictionaryEntry";


export default function DictionarySection() {
    const [currentDictionary, setCurrentDictionary] = useState<string>(""); // state for selected dictionary
    const dictionaries = useAppSelector(state => state.dictionarySlice);

    const handleDictionaryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentDictionary(event.currentTarget.value);
    }

    console.log(`Current Dictionary: ${currentDictionary}`);

    return (
        <section id="dictionary-section" className="w-[60%] md:w-[30%]" >
            <h2 className='text-2xl mb-4'>Dictionaries</h2>

            {/* dictionary selection panel */}
            <select name="current-dictionary" id="current-dictionary" onChange={handleDictionaryChange}
                    className="cursor-pointer bg-[#505050] hover:bg-[#606060] p-2 rounded-sm">
                <option value="">Choose a dictionary</option>
                {
                    Object.keys(dictionaries).map(key => (<option key={key} value={key}>{key}</option>))
                }
            </select>

            {/* dictionary div */}
            <ul className="list-none mt-4 py-4 px-3 bg-[#505050] min-w-[300px] min-h-[250px] rounded-md flex flex-col gap-y-4">
                {
                    currentDictionary && (
                        <>{dictionaries[currentDictionary].map((translation, index) => (
                            <DictionaryEntry key={index} translation={translation} dictionary={currentDictionary}/>
                        ))}</>
                    )
                }
            </ul>
        </section>
    );
}