import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { SortBy, TranslationResult } from "../../types";
import Category from "./Category";
import { sortByName } from "./utils";
import { setSelectedDictionaryName, setSortBy } from "../../redux/features/settings/settingsSlice";


/*  ToDo: 
    - move currentDictonary state to redux
    - change current dictionary when a new entry added (in TranslationSection)
    - remove useEffect when all of the above done 

    - add addedDate for every translation
    - sort by unlearned/learned
    - sort by addedDate
 */


export default function DictionarySection() {
    /** Redux State */
    const dispatch = useAppDispatch();

    const dictionaries = useAppSelector(state => state.dictionarySlice);
    const currentDictionaryNameRedux = useAppSelector(state => state.settingsSlice.selectedDictionaryName);
    const sortBy = useAppSelector(state => state.settingsSlice.sortBy);



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
        if (dictionariesNotEmpty && currentDictionaryNameRedux == "") {
            dispatch(setSelectedDictionaryName(dictionaryAllNames[0]));
        }

        // if selected dictionary is empty, select empty string
        if (currentDictionaryNameRedux && !dictionaries[currentDictionaryNameRedux]) {
            dispatch(setSelectedDictionaryName(""));
        }
    }, [dictionaries, currentDictionaryNameRedux, dispatch]);
    


    /** Pre-render transformations */

    let currentDictionary: TranslationResult[] | undefined = dictionaries[currentDictionaryNameRedux];

    // ToDo: move sorting to utils
    switch (sortBy) {
        case (SortBy.Name): currentDictionary = sortByName(currentDictionary);
        break;
    }
    
    const learnedWords = currentDictionary?.filter(word => word.learned);
    const notLearnedWords = currentDictionary?.filter(word => !word.learned);
    
    return (
        <section id="dictionary-section" className="md:w-[40%] w-[80%] md:min-w-[350px] mb-8">
            <h2 className='text-2xl mb-4'>Dictionaries</h2>

             {/* dictionary selection panel */}
             <div className="flex justify-between items-center mr-2">
                <select name="current-dictionary" id="current-dictionary" value={currentDictionaryNameRedux ?? ""} onChange={handleDictionaryChange}
                        className="cursor-pointer bg-[#505050] hover:bg-[#606060] p-2 rounded-sm">
                    {
                        Object.keys(dictionaries).length > 0 
                        ?
                            Object.keys(dictionaries).map(key => (<option key={key} value={key}>{key}</option>))
                        :
                            <option value="">Choose a dictionary</option>
                    }
                </select>

                <div className="h-7">
                    <button onClick={() => dispatch(setSortBy(sortBy ? null : SortBy.Name))} 
                        className={`h-full aspect-square rounded-md ${sortBy == SortBy.Name ? "bg-[#e29d48] hover:bg-[#eab676]" : "bg-[#e2e248] hover:bg-[#f3f37b]"}  active:bg-[#e29d48] text-black cursor-pointer`}>
                        Aa
                     </button>
                </div>

             </div>

             {/* dictionary div */}
            <div className="mt-4 py-4 bg-[#505050] min-w-[300px] w-full min-h-[250px] md:max-h-[65vh] max-h-[80vh] overflow-scroll rounded-md flex flex-col gap-y-4">
                <Category name="Not Learned" words={notLearnedWords} dictionaryName={currentDictionaryNameRedux} />
                <Category name="Learned" words={learnedWords} dictionaryName={currentDictionaryNameRedux} />
            </div>
        </section>
    );
}