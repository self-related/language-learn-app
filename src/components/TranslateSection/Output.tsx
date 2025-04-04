interface OutputProps {
    mainTranslation: string,
    onOutputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onOutputReset: () => void
}

export default function Output({ mainTranslation, onOutputChange, onOutputReset}: OutputProps) {

    return (
    <div id="output-div" className="mt-4">
        <textarea id="output" value={mainTranslation} onChange={onOutputChange}
            className='bg-[#505050] hover:bg-[#606060] accent-orange-400 my-2 px-2 py-1 min-h-[70px] h-min w-[225px] rounded-sm resize-none'
        />

        {/* buttons */}
        <div className="flex justify-end">
            <button onClick={onOutputReset}
                className='px-2 mr-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus-visible::outline-2 cursor-pointer rounded-sm'
            >Reset
            </button>

            <button 
                className='px-2 mr-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus-visible:outline-2 cursor-pointer rounded-sm'
            >Add
            </button>
        </div>

    </div>
    );
}