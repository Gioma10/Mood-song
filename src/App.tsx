import { useState } from "react"
import Navbar from "./components/Navbar"
import Questions from "./components/Questions"

function App() {
  const [isStarted, setIsStarted]= useState<boolean>(false)

  return (
    <>
      <Navbar />
      {!isStarted ? 
        <div className="flex flex-col justify-center items-center h-screen gap-12">
          <h1 className="text-9xl">Mood Song</h1>
          <button 
            className="border py-1 px-4 cursor-pointer"
            onClick={()=> setIsStarted(true)}
            >
              Get started
          </button>
        </div>
        :
        <Questions onBack={()=>setIsStarted(false)}/>
      }
    </>
  )
}

export default App
