
const MadeBy = ()=>{

    return (
        <div className="h-screen w-screen mt-40">
            <h1 className="w-[200px] text-center m-auto text-5xl">Made By</h1>
            <div className="h-screen flex justify-between mt-20 ml-7 mr-7">
                <div className="h-96 w-96 bg-purple-500 rounded-3xl text-center hover:translate-x-6 transform transition duration-300">
                    <h2 className="text-3xl mt-7">Giovanni</h2>
                </div>  
                <div className="h-96 w-96 text-center">
                    <h2 className="text-3xl mt-7 mb-8">Project Description</h2>
                    <p className="text-[13pt]">"This project was born from a passion for music and the desire to create a unique experience for users. We developed a website that helps you find the perfect soundtrack for your mood: just enter how you feel, and you'll discover a selection of songs that match your emotions. A simple and intuitive way to let music guide your feelings!"</p>
                </div>
                <div className="h-96 w-96 bg-purple-500 rounded-3xl text-center hover:-translate-x-6 transform transition duration-300">
                    <h2 className="text-3xl mt-7">Nicolas</h2>
                </div>
            </div>
        </div>
    )
}

export default MadeBy; 