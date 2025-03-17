import Navbar from "./components/Navbar"

function App() {


  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-8xl">Mood Song</h1>
        <button>Get started</button>
      </div>
    </>
  )
}

export default App
