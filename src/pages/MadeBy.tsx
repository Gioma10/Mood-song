import React from "react";
import ScaleCorrection from "../components/ScaleCorrectionProps"; // Importiamo il componente
import IgLogo from "../img/instagramLogo.png";
import LinkedinLogo from "../img/linkedinLogo.png";

const MadeBy: React.FC = () => {
    const giovanniContent = {
        title: "Giovanni",
        description: "Descrizione",
        socialLinks: [
            { platform: "Instagram", url: "https://www.instagram.com/gioma_code/", icon: IgLogo },
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/giovanni-mauro-web-developer/", icon: LinkedinLogo },
        ],
    };

    const nicolasContent = {
        title: "Nicolas",
        description: "I’m a student who has been self-learning full-stack development for a year...",
        socialLinks: [
            { platform: "Instagram", url: "https://www.instagram.com/brazz0_/", icon: IgLogo },
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/nicolas-brazzo-a91509286/", icon: LinkedinLogo },
        ],
    };


    return (
        <div className="w-screen mt-80 min-h-[100%] border border-amber-400">
            <h1 className="w-[200px] text-center m-auto text-5xl border">Made By</h1>
            <div className="h-screen flex justify-around mt-20 ml-7 mr-7 border">
                <ScaleCorrection content={giovanniContent} />
                <div className="h-96 w-96 text-center border">
                    <h2 className="text-3xl mt-7 mb-8">Project Description</h2>
                    <p className="text-[13pt]">
                        "This project was born from a passion for music and the desire to create a unique experience for users..."
                    </p>
                </div>
                <ScaleCorrection content={nicolasContent} />
            </div>
        </div>
    );
};

export default MadeBy;
