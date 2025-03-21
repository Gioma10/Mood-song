import Button from "../components/Button";

const Home = ()=>{
    return (
<div className="flex flex-col justify-center items-center h-screen gap-12">
       <h1 className="text-9xl">Mood Song</h1>
            <Button path="/choose-category" text="Get Started" />
    </div>
    )
}

export default Home;