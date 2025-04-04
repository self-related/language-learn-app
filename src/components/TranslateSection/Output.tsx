interface OutputProps {
    translatedWord: string,
    onOutputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void

}

export default function Output({ translatedWord, onOutputChange}: OutputProps) {

    
    return (
    <div id="output-div" className="mt-4">
        <textarea id="output" value={translatedWord} onChange={onOutputChange}
            className='bg-[#505050] hover:bg-[#606060] accent-orange-400 my-2 px-2 py-1 min-h-[70px] h-min w-[225px] rounded-sm resize-none'
        />

        <button className='px-2 block ml-auto mr-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus:outline-2 cursor-pointer rounded-sm'
         >Add
        </button>
    </div>
    );
}