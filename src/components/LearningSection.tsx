export default function LearningSection() {


    return (
        <div id="learning-section">

            {/* Section for searching and adding words */}
            
            <h2 className='font-medium text-center'
             >Add new words
            </h2>

            <div>
                <textarea id="user-input" placeholder='type a word or a phrase' 
                    className='bg-[#505050] hover:bg-[#606060] accent-orange-400 mt-4 mb-2 px-2 py-1 w-[225px] resize-none rounded-sm'
                />
                <button></button>
            </div>

            <div>
                <textarea id="output"
                    className='bg-[#505050] hover:bg-[#606060] accent-orange-400 my-2 px-2 py-1 min-h-[70px] h-min w-[225px] rounded-sm resize-none'
                />

                <button className='px-2 block ml-auto bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus:outline-2 cursor-pointer rounded-sm'
                 >Add
                </button>


                {/* Section to choose more options */}
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