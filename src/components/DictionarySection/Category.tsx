import { useState } from "react";
import { ContextMenuData, TranslationResult } from "@/src/types";
import DictionaryEntry from "./DictionaryEntry";

interface CategoryProps {
    name: string,
    dictionaryName: string,
    words?: TranslationResult[],
    setContextMenu?: React.Dispatch<React.SetStateAction<ContextMenuData | null>>
}

export default function Category({name, words, dictionaryName, setContextMenu}: CategoryProps) {
    const [collapsed, setCollapsed] = useState(false);
    const wordsEmpty = !words || words?.length === 0;

    if (!dictionaryName) {
        return "";
    }

    return (
        <div className="w-full px-2">
            <button onClick={() => setCollapsed(!collapsed)}
                className="w-full h-8 bg-[#393b3b] rounded-sm hover:bg-[#414242] active:bg-[#232424] flex justify-between items-center px-2 pr-5 cursor-pointer"
            >   <span style={{textShadow: "black 0.07rem 0.07rem 0.08rem"}}>{name}</span>
                <span>{collapsed || wordsEmpty ? "+" : "-"}</span>
            </button>
            {
                !collapsed && !wordsEmpty && (
                    <ul className="list-none mt-3 pl-2 bg-[#505050] min-w-[300px] rounded-md flex flex-col gap-y-3">{words?.map((translation, index) => (
                        <DictionaryEntry key={index} translation={translation} dictionary={dictionaryName} setContextMenu={setContextMenu}/>
                    ))}</ul>
                )
            }

        </div>
    );
}