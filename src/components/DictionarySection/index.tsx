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
            <select name="current-dictionary" id="current-dictionary" onChange={handleDictionaryChange}
                    className="cursor-pointer bg-[#505050] hover:bg-[#606060] p-2 rounded-sm">
                <option value="">Choose a dictionary</option>
                {
                    Object.keys(dictionaries).map(key => (<option key={key} value={key}>{key}</option>))
                }
            </select>
            <div className="mt-4 p-2 bg-[#505050] min-w-[300px] min-h-[250px] rounded-md">
                {
                    currentDictionary && (
                        <div>{dictionaries[currentDictionary].map((translation, index) => (
                            <p key={index}><span className="text-red-300">{translation?.original}</span> - {translation?.mainTranslation} <button onClick={ () => handleRemoveButton(translation?.original) } className="text-white ml-1.5 rounded-sm w-4 h-4 text-[0.7rem] bg-gray-700 cursor-pointer hover:bg-gray-500 active:bg-gray-900">X</button></p>
                        ))}</div>
                    )
                }
            </div>
        </section>
    );
}