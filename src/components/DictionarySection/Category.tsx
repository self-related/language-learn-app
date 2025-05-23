import { useState } from "react";
import { TranslationResult } from "../../types";
import DictionaryEntry from "./DictionaryEntry";

interface CategoryProps {
    name: string,
    dictionaryName: string,
    words?: TranslationResult[],
}

export default function Category({name, words, dictionaryName}: CategoryProps) {
    const [collapsed, setCollapsed] = useState(false);
    const wordsEmpty = !words || words?.length === 0;

    return (
        <div className="w-full px-2">
            <button onClick={() => setCollapsed(!collapsed)}
                className="w-full h-8 bg-[#393b3b] rounded-sm hover:bg-[#414242] active:bg-[#232424] flex justify-between items-center px-2 pr-5 cursor-pointer"
            >   <span>{name}</span>
                <span>{collapsed || wordsEmpty ? "+" : "-"}</span>
            </button>
            {
                !collapsed && !wordsEmpty && (
                    <ul className="list-none mt-3 pl-2 bg-[#505050] min-w-[300px] rounded-md flex flex-col gap-y-3">{words?.map((translation, index) => (
                        <DictionaryEntry key={index} translation={translation} dictionary={dictionaryName}/>
                    ))}</ul>
                )
            }

        </div>
    );
}