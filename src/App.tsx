import './App.css'
import DictionarySection from './components/DictionarySection'
import TranslateSection from './components/TranslateSection'

function App() {

  return (
    <>
        <nav className='w-full h-[55px] text-2xl bg-[#151515] flex justify-center items-center'>
            Language Learning App
        </nav>

        <main className='px-6 pt-4 flex flex-col justify-center items-center md:items-start md:flex-row md:gap-12'>
            <TranslateSection />
            <DictionarySection />
        </main>
    </>
    
  )
}

export default App
