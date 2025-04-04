import { useState } from "react";

// temp type for dictionary
interface Dictionary {
    [word: string]: Word,
}

// type for words
interface Word {
    name: string,
    translation: string,
    isLearned: boolean
}

export default function DictionarySection() {
    const [currentDictionaty, setCurrentDictionary] = useState<Dictionary>({}); // temp state for dictionary

    return (
        <section id="dictionary-section" className="w-[60%] md:w-[30%]" >
            <h2 className='text-2xl mb-4'>Dictionaries</h2>
            <select name="current-dictionary" id="current-dictionary" 
                    className="cursor-pointer bg-[#505050] hover:bg-[#606060] p-2 rounded-sm">
                <option value="">Choose a dictionary</option>
            </select>
            <div className="mt-4 bg-[#505050] min-w-[300px] min-h-[250px] rounded-md">

            </div>
        </section>
    );
}