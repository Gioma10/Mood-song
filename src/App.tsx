import { useState } from "react"
import Navbar from "./components/Navbar"
import Questions from "./components/Questions"
import Button from "./components/Button"

function App() {
  const [isStarted, setIsStarted]= useState<boolean>(false)

  return (
    <>
      <Navbar />
      {!isStarted ? 
        <div className="flex flex-col justify-center items-center h-screen gap-12">
          <h1 className="text-9xl">Mood Song</h1>
          <Button 
            text="Get Started"
            onClick={()=> setIsStarted(true)}>
          </Button>
        </div>
        :
        <Questions onBack={()=>setIsStarted(false)}/>
      }
    </>
  )
}

export default App
