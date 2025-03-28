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
        description: "I'm a programming student passionate about technology and music. Mood-Song has helped me improve my web development skills and grow along the way.",
        socialLinks: [
            { platform: "Instagram", url: "https://www.instagram.com/brazz0_/", icon: IgLogo },
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/nicolas-brazzo-a91509286/", icon: LinkedinLogo },
        ],
    };


    return (
        <div className="w-screen h-screen mt-20 min-h-[100%] relative overflow-hidden">
            <h1 className="w-[200px] text-center m-auto text-5xl">Made By</h1>
            <div className="h-[400px] flex justify-between mt-20 px-20 relative items-center">
                {/* Card sinistra */}
                <div className="flex-shrink-0">
                    <ScaleCorrection content={giovanniContent} />
                </div>

                {/* Testo centrale (fisso) */}
                <div className="h-[100%] w-96 flex flex-col items-center text-center absolute left-1/2 transform -translate-x-1/2 translate-y-9">
                    <h2 className="text-3xl mt-7 mb-8">Project Description</h2>
                    <p className="text-[13pt]">
                        Mood Song is a website that generates personalized Spotify playlists based on your emotions. Simply select your mood, and the system will create the perfect soundtrack for every moment.
                        A unique musical experience to accompany you through every emotion. 🎶✨
                    </p>
                </div>

                {/* Card destra */}
                <div className="flex-shrink-0">
                    <ScaleCorrection content={nicolasContent} />
                </div>
            </div>
        </div>
    );


};

export default MadeBy;
