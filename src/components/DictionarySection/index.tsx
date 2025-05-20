import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import DictionaryEntry from "./DictionaryEntry";


/*  ToDo: 
    - move currentDictonary state to redux
    - change current dictionary when a new entry added (in TranslationSection)
    - remove useEffect when all of the above done 
 */


export default function DictionarySection() {
    const dictionaries = useAppSelector(state => state.dictionarySlice);
    const [currentDictionary, setCurrentDictionary] = useState<string>(""); // state for selected dictionary

    const handleDictionaryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentDictionary(event.currentTarget.value);
    }

    // set the first available dictionary (if it exists) to the currentDictionary state
    useEffect(() => {
        const dictionaryNames = Object.keys(dictionaries);
        const dictionaryNotEmpty = dictionaryNames.length > 0;

        if (dictionaryNotEmpty && currentDictionary == "") {
            setCurrentDictionary(dictionaryNames[0]);
        }

        if (currentDictionary && !dictionaries[currentDictionary]) {
            setCurrentDictionary("");
        }
    }, [dictionaries, currentDictionary]);


    return (
        <section id="dictionary-section" className="w-[60%] md:w-[30%]">
            <h2 className='text-2xl mb-4'>Dictionaries</h2>

            {/* dictionary selection panel */}
            <select name="current-dictionary" id="current-dictionary" value={currentDictionary ?? ""} onChange={handleDictionaryChange}
                    className="cursor-pointer bg-[#505050] hover:bg-[#606060] p-2 rounded-sm">
                {
                    Object.keys(dictionaries).length > 0 
                    ?
                        Object.keys(dictionaries).map(key => (<option key={key} value={key}>{key}</option>))
                    :
                        <option value="">Choose a dictionary</option>
                }
            </select>

            {/* dictionary div */}
            <ul className="list-none mt-4 py-4 px-3 bg-[#505050] min-w-[300px] min-h-[250px] rounded-md flex flex-col gap-y-4">
                {
                    currentDictionary && (
                        <>{dictionaries[currentDictionary]?.map((translation, index) => (
                            <DictionaryEntry key={index} translation={translation} dictionary={currentDictionary}/>
                        ))}</>
                    )
                }
            </ul>
        </section>
    );
}