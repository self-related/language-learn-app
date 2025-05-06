
interface UserInputProps {
    autoTranslation: boolean,
    sourceText: string,
    onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onButtonClick: () => void,
}

export default function UserInput(props: UserInputProps) {
    const { 
        autoTranslation, 
        sourceText, 
        onInputChange, 
        onCheckboxChange, 
        onButtonClick 
    } = props;

    return (
        <div id="input-div" >
            <textarea id="user-input" placeholder='type a word or a phrase' value={sourceText} onChange={onInputChange} 
                className='block w-full min-h-22 bg-[#505050] hover:bg-[#606060] accent-orange-400 mt-4 mb-2 px-2 py-1 resize-none rounded-sm text-shadow-black-005rem'
            />
            <label htmlFor="auto-translate" className="block ml-auto mr-2 w-fit">
                Translate automatically?
                
                <input id="auto-translate" type="checkbox" checked={autoTranslation} onChange={onCheckboxChange}
                    className="ml-2 accent-orange-500"
                />
            </label>
            { 
                autoTranslation == false 
                ? <button onClick={onButtonClick}
                    className='mt-1 px-2 block ml-auto bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus-visible:outline-2 cursor-pointer rounded-sm'
                    >Translate
                </button>
                : ""
            }
        </div>  
    );

}