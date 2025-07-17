import { useEffect, useState } from 'react';
import './App.css'
import DictionarySection from './components/DictionarySection'
import TranslateSection from './components/TranslateSection'
import { ContextMenuData } from './types';
import DictionaryContextMenu from './components/DictionarySection/DictionaryContextMenu';

function App() {

    const [contextMenu, setContextMenu] = useState<ContextMenuData | null>(null);


    useEffect(() => {
        const disableContextMenu = () => setContextMenu(null);
        window.addEventListener("click", disableContextMenu);

        return () => window.removeEventListener("click", disableContextMenu);
    });

  return (
    <div className='relative'>
        <nav className='w-full h-[55px] text-2xl bg-[#151515] flex justify-center items-center'>
            Language Learning App
        </nav>

        <main className='px-6 pt-4 flex flex-col justify-center items-center md:items-start md:flex-row md:gap-12'>
            <TranslateSection />
            <DictionarySection setContextMenu={setContextMenu} />
        </main>

        {
            contextMenu && (<DictionaryContextMenu className={`absolute`} y={contextMenu.y} x={contextMenu.x} contextMenuActions={contextMenu.contextMenuActions} />)
        }

    </div>
    
  )
}

export default App
