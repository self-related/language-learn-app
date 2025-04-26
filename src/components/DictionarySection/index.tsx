import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";


export default function DictionarySection() {
    const [currentDictionary, setCurrentDictionary] = useState<string>(""); // state for selected dictionary
    const dictionaries = useAppSelector(state => state.dictionarySlice);
    const dispatch = useAppDispatch();

    const handleDictionaryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentDictionary(event.currentTarget.value);
    }

    console.log(`Current Dictionary: ${currentDictionary}`);
    const handleRemoveButton = (original?: string) => {
        dispatch({type: "dictionarySlice/deleteTranslation", payload: {dictionary: currentDictionary, original}});
    }
    
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
            <div className="mt-4 py-4 px-3 bg-[#505050] min-w-[300px] min-h-[250px] rounded-md flex flex-col gap-y-4">
                {
                    currentDictionary && (
                        <>{dictionaries[currentDictionary].map((translation, index) => (
                            <div key={index} className="flex justify-between items-center bg-[#414343] px-3 py-2 rounded-sm">
                                <p className="max-w-[92%] break-words">
                                   <span className="text-red-300">{translation?.original}</span> <br/> {translation?.mainTranslation} 
                                </p>
                                <button onClick={ () => handleRemoveButton(translation?.original) } className=" text-red-500 ml-1.5 rounded-sm h-6 aspect-square text-l  cursor-pointer hover:bg-orange-300 active:bg-orange-900">X</button>
                            </div>
                        ))}</>
                    )
                }
            </div>
        </section>
    );
}