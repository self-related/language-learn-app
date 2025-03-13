import './App.css'
import DictionarySection from './components/DictionarySection'
import LearningSection from './components/LearningSection'

function App() {

  return (
    <>
        <nav className='w-full min-h-[55px] bg-[#151515] flex justify-center items-center'>
            Language Learning App
        </nav>

        <main className='px-6 pt-4 flex flex-col items-center md:items-start md:flex-row md:gap-12'>
            <LearningSection />
            <DictionarySection />
        </main>
    </>
    
  )
}

export default App
