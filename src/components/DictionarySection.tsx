import { useState } from "react";

// temp type for dictionary
interface Dictionary {
    [word: string]: string,
}

export default function DictionarySection() {
    const [currentDictionaty, setCurrentDictionary] = useState<Dictionary>({}); // temp state for dictionary

    return (
        <div id="dictionary-section" className="text-center">
            <h2>Dictionaries</h2>
            <select name="current-dictionary" id="current-dictionary" className="mt-4 min-w-20 cursor-pointer">
                <option value="">Choose a dictionary</option>
            </select>
            <div className="mt-4 bg-[#505050] min-w-[300px] min-h-[250px] rounded-md">

            </div>
        </div>
    );
}