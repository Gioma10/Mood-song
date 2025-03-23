import IgLogo from "../img/instagramLogo.png"
import LinkedinLogo from "../img/linkedinLogo.png"

const MadeBy = () => {

    return (
        <div className="h-screen w-screen pt-30">
            <h1 className="w-[200px] text-center m-auto text-5xl">Made By</h1>
            <div className="h-screen flex justify-between mt-20 ml-7 mr-7">
                <div className="h-96 w-96 bg-purple-500 rounded-3xl text-center hover:translate-x-6 transform transition duration-300">
                    <h2 className="text-3xl mt-7">Giovanni</h2>
                    <p>Descrizione</p>
                    <div className="w-[80%] flex justify-left gap-3 items-center pl-6 m-auto pb-2 pt-7">
                        <img src={IgLogo} alt="" className="w-[30px]" />
                        <a className="hover:border-b" href="https://www.instagram.com/gioma_code/"><h3>Instagram</h3></a>
                    </div>
                    <div className="w-[80%] flex justify-left gap-3 items-center pl-6 m-auto">
                        <img src={LinkedinLogo} alt="" className="w-[30px]" />
                        <a className="hover:border-b" href=""><h3>Linkedin</h3></a>
                    </div>
                </div>
                <div className="h-96 w-96 text-center">
                    <h2 className="text-3xl mt-7 mb-8">Project Description</h2>
                    <p className="text-[13pt]">"This project was born from a passion for music and the desire to create a unique experience for users. We developed a website that helps you find the perfect soundtrack for your mood: just enter how you feel, and you'll discover a selection of songs that match your emotions. A simple and intuitive way to let music guide your feelings!"</p>
                </div>
                <div className="h-96 w-96 bg-purple-500 rounded-3xl text-center hover:-translate-x-6 transform transition duration-300">
                    <h2 className="text-3xl mt-7 mb-4">Nicolas</h2>
                    <p className="w-[70%] m-auto">I’m a student who has been self-learning full-stack development for a year. I’ve focused on improving user experience and continue to learn and grow in my skills.</p>
                    <div className="w-[80%] flex justify-left gap-3 items-center pl-6 m-auto pb-2 pt-7">
                        <img src={IgLogo} alt="" className="w-[30px]" />
                        <a className="hover:border-b" href="https://www.instagram.com/brazz0_/"><h3>Instagram</h3></a>
                    </div>
                    <div className="w-[80%] flex justify-left gap-3 items-center pl-6 m-auto">
                        <img src={LinkedinLogo} alt="" className="w-[30px]" />
                        <a className="hover:border-b" href="https://www.linkedin.com/in/nicolas-brazzo-a91509286/"><h3>Linkedin</h3></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MadeBy; 