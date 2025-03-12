import './App.css'

function App() {

  return (
    <>
        <nav className='w-full min-h-[55px] bg-[#151515] flex justify-center items-center'>
            Language Learning App
        </nav>

        <main>
            <div>
                <textarea placeholder='type a word or a phrase' 
                    className='bg-[#505050] mt-4 mb-2 ml-2 px-2 py-1 w-[225px] resize-none'
                />
                <button></button>
            </div>

            <div>
                <div
                    className='bg-[#505050] my-2 ml-2 px-2 py-1 min-h-[70px] h-min w-[225px]'
                >
                </div>
                <button></button>
            </div>
        </main>
    </>
    
  )
}

export default App
