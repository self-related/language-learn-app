import { setTranslateAutomatically } from "../../redux/features/translate/translateSlice";
import { setOriginal } from "../../redux/features/translate/translateSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

interface UserInputProps {
    onButtonClick: () => void,
}

export default function UserInput({ onButtonClick }: UserInputProps) {
    
    // Redux
    const dispatch = useAppDispatch();

    const userInputText = useAppSelector(state => state.translateSlice.original);
    const translateAutomatically = useAppSelector(state => state.translateSlice.translateAutomatically);

    // callbacks
    const changeInput = (value: string) => dispatch(setOriginal(value));

    return (
        <div id="input-div" >
            <textarea id="user-input" 
                placeholder='type a word or a phrase' 
                value={userInputText} 
                onChange={(e) => changeInput(e.currentTarget.value)} 
                className='block w-full min-h-22 bg-[#505050] hover:bg-[#606060] accent-orange-400 mt-4 mb-2 px-2 py-1 resize-none rounded-sm text-shadow-black-005rem'
            />
            <label htmlFor="auto-translate" className="block ml-auto mr-2 w-fit">
                Translate automatically?
                
                <input id="auto-translate" type="checkbox" checked={translateAutomatically} onChange={(e) => dispatch(setTranslateAutomatically(e.target.checked == true ? true : false))}
                    className="ml-2 accent-orange-500"
                />
            </label>
            { 
                translateAutomatically == false 
                ? <button onClick={onButtonClick}
                    className='mt-1 px-2 block ml-auto bg-gray-700 hover:bg-gray-600 active:bg-gray-800 accent-orange-400 outline-orange-400 focus-visible:outline-2 cursor-pointer rounded-sm'
                    >Translate
                </button>
                : ""
            }
        </div>  
    );

}