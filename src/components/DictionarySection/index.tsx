import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { TranslationResult } from "../../types";
import Category from "./Category";


/*  ToDo: 
    - move currentDictonary state to redux
    - change current dictionary when a new entry added (in TranslationSection)
    - remove useEffect when all of the above done 

    - add addedDate for every translation
    - sort by unlearned/learned
    - sort by addedDate
 */


export default function DictionarySection() {
    const dictionaries = useAppSelector(state => state.dictionarySlice);
    const [currentDictionaryName, setCurrentDictionaryName] = useState<string>(""); // state for selected dictionary

    const words: TranslationResult[] = dictionaries[currentDictionaryName];
    const learnedWords = words?.filter(word => word.learned);
    const notLearnedWords = words?.filter(word => !word.learned);

    const handleDictionaryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentDictionaryName(event.currentTarget.value);
    }

    // set the first available dictionary (if it exists) to the currentDictionaryName state
    useEffect(() => {
        const dictionaryAllNames = Object.keys(dictionaries);
        const dictionariesNotEmpty = dictionaryAllNames.length > 0;

        // if no dictionary selected, set the first available dictionary 
        if (dictionariesNotEmpty && currentDictionaryName == "") {
            setCurrentDictionaryName(dictionaryAllNames[0]);
        }

        // if selected dictionary is empty, select empty string
        if (currentDictionaryName && !dictionaries[currentDictionaryName]) {
            setCurrentDictionaryName("");
        }
    }, [dictionaries, currentDictionaryName]);


    return (
        <section id="dictionary-section" className="md:w-[40%] w-[80%] md:min-w-[350px] mb-8">
            <h2 className='text-2xl mb-4'>Dictionaries</h2>

             {/* dictionary selection panel */}
            <select name="current-dictionary" id="current-dictionary" value={currentDictionaryName ?? ""} onChange={handleDictionaryChange}
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
            <div className="mt-4 py-4 bg-[#505050] min-w-[300px] w-full min-h-[250px] md:max-h-[65vh] max-h-[80vh] overflow-scroll rounded-md flex flex-col gap-y-4">
                <Category name="Not Learned" words={notLearnedWords} dictionaryName={currentDictionaryName} />
                <Category name="Learned" words={learnedWords} dictionaryName={currentDictionaryName} />
            </div>
        </section>
    );
}