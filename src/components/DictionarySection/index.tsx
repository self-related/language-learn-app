import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ContextMenuData, SortBy, TranslationResult } from "../../types";
import Category from "./Category";
import { sortByName } from "./utils";
import { setSelectedDictionaryName, setSortBy, switchHideTranslations } from "../../redux/features/dictionary/dictionarySlice";

/*  ToDo: 
    - move currentDictonary state to redux
    - change current dictionary when a new entry added (in TranslationSection)
    - remove useEffect when all of the above done 

    - add addedDate for every translation
    - sort by unlearned/learned
    - sort by addedDate
 */

    interface Props {
        setContextMenu?: React.Dispatch<React.SetStateAction<ContextMenuData | null>>
    }


export default function DictionarySection({ setContextMenu }: Props) {
    /** Redux State */
    const dispatch = useAppDispatch();

    const dictionaries = useAppSelector(state => state.dictionarySlice).dictionaryMap;
    const currentDictionaryName = useAppSelector(state => state.dictionarySlice.selectedDictionaryName);
    const sortBy = useAppSelector(state => state.dictionarySlice.sortBy);
    const hideTranslations = useAppSelector(state => state.dictionarySlice.hideTranslations); 


    /** Callbacks */

    const handleDictionaryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectedDictionaryName(event.target.value));
    }


    /** Effects */

     // set the first available dictionary (if it exists) to the currentDictionaryName state
    useEffect(() => {
        const dictionaryAllNames = Object.keys(dictionaries);
        const dictionariesNotEmpty = dictionaryAllNames.length > 0;

        // if no dictionary selected, set the first available dictionary 
        if (dictionariesNotEmpty && currentDictionaryName == "") {
            dispatch(setSelectedDictionaryName(dictionaryAllNames[0]));
        }

        // if selected dictionary is empty, select empty string
        if (currentDictionaryName && !dictionaries[currentDictionaryName]) {
            dispatch(setSelectedDictionaryName(""));
        }
    }, [dictionaries, currentDictionaryName, dispatch]);
    


    /** Pre-render transformations */

    let currentDictionary: TranslationResult[] | undefined = dictionaries[currentDictionaryName];

    // ToDo: move sorting to utils
    switch (sortBy) {
        case (SortBy.Name): currentDictionary = sortByName(currentDictionary);
        break;
    }
    
    const learnedWords = currentDictionary?.filter(word => word.learned);
    const notLearnedWords = currentDictionary?.filter(word => !word.learned);
    
    return (
        <section id="dictionary-section" className="md:w-[40%] w-[80%] md:min-w-[350px] mb-8 relative">
            <h2 className='text-2xl mb-4'>Dictionaries</h2>

             {/* dictionary selection panel */}
            <div className="flex justify-between items-center mr-2">
                <select name="current-dictionary" id="current-dictionary" value={currentDictionaryName ?? ""} onChange={handleDictionaryChange} style={{textShadow: "black 0.08rem 0.08rem 0.05rem"}}
                        className="cursor-pointer bg-[#505050] hover:bg-[#606060] p-2 rounded-sm">
                    {
                        Object.keys(dictionaries).length > 0 
                        ?
                            Object.keys(dictionaries).map(key => (<option key={key} value={key}>{key}</option>))
                        :
                            <option value="">Choose a dictionary</option>
                    }
                </select>


                 {/* buttons */}
                <div className="h-7 flex gap-2">
                     {/* hide button */}
                    <button onClick={() => dispatch(switchHideTranslations())}
                        className={`h-full px-1 rounded-md ${hideTranslations ? "bg-[#ed9427] hover:bg-orange-300" : "bg-[#606060] hover:bg-[#707070]"}  active:bg-orange-700  cursor-pointer`} style={{textShadow: "black 0.08rem 0.08rem 0.05rem"}}
                    >hide
                    </button>
                    
                     {/* sort button */}
                    <button onClick={() => dispatch(setSortBy(sortBy ? null : SortBy.Name))} 
                        className={`h-full aspect-square rounded-md ${sortBy == SortBy.Name ? "bg-[#ed9427] hover:bg-orange-300 " : "bg-[#606060] hover:bg-[#707070]"}  active:bg-orange-700 cursor-pointer`} style={{textShadow: "black 0.08rem 0.08rem 0.05rem"}}>
                        Aa
                    </button>
                    
                </div>
            </div>

             {/* dictionary div */}
            <div className="mt-4 py-4 bg-[#505050] min-w-[300px] w-full min-h-[250px] md:max-h-[65vh] max-h-[80vh] overflow-scroll rounded-md flex flex-col gap-y-4">
                
                {/* ToDo: Make categories wrappers */}
                
                <Category name="Not Learned" words={notLearnedWords} dictionaryName={currentDictionaryName} setContextMenu={setContextMenu} />
                <Category name="Learned" words={learnedWords} dictionaryName={currentDictionaryName} setContextMenu={setContextMenu}/>
            </div>
        </section>
    );
}