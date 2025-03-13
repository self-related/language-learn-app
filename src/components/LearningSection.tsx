import { useState } from "react";

export default function LearningSection() {

    const [autoTranslate, setAutoTranslate] = useState(true);

    const handleautoTranslateCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) setAutoTranslate(true);
        else setAutoTranslate(false);
    };

    return (
        <div id="learning-section">
            
            {/* Section Header */}
            <h2 className='font-medium text-center'
             >Add new words
            </h2>

            {/* User Input */}
            <div id="input-div">
                <textarea id="user-input" placeholder='type a word or a phrase' 
                    className='block bg-[#505050] hover:bg-[#606060] accent-orange-400 mt-4 mb-2 px-2 py-1 w-[225px] resize-none rounded-sm'
                />
                <label htmlFor="auto-translate" className="block ml-auto w-fit">
                    Translate automatically?
                    
                    <input id="auto-translate" type="checkbox" checked={autoTranslate} onChange={handleautoTranslateCheckbox}
                        className="ml-2 accent-orange-500"
                    />
                </label>
                { 
                    autoTranslate == false 
                    ? <button className='mt-1 px-2 block ml-auto bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus:outline-2 cursor-pointer rounded-sm'
                        >Translate
                      </button>
                    : ""
                }
            </div>

            {/* Output */}
            <div id="output-div" className="mt-4">
                <textarea id="output"
                    className='bg-[#505050] hover:bg-[#606060] accent-orange-400 my-2 px-2 py-1 min-h-[70px] h-min w-[225px] rounded-sm resize-none'
                />

                <button className='px-2 block ml-auto bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus:outline-2 cursor-pointer rounded-sm'
                 >Add
                </button>
            </div>

            {/* More options from translator api */}
            <div id="more-options">
                <h2 className="font-medium text-center mt-8"
                    >More options
                </h2>

                <div
                    className='bg-[#505050] my-2 px-2 py-1 min-h-[70px] h-min w-[225px] rounded-sm'
                >
                </div>
            </div>

        </div>

    );
}