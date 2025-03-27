import React, { useState } from "react";
import { motion } from "framer-motion";

interface ContentProps {
  title: string;
  description: string;
  socialLinks: { platform: string; url: string; icon: string }[];
}

interface ScaleCorrectionProps {
  content: ContentProps;
}

const ScaleCorrection: React.FC<ScaleCorrectionProps> = ({ content }) => {
  const [expanded, setExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => {
        setExpanded(!expanded);
        setShowContent(!showContent);
      }}
      className="relative flex items-center justify-center bg-purple-500 rounded-2xl cursor-pointer border"
      style={{
        width: expanded ? 300 : 100,
        height: expanded ? 400 : 100,
      }}
    >
      <motion.div
        layout
        className="absolute bottom-6 w-12 h-12 bg-white rounded-full"
      />
      
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-10 text-white text-center px-4"
        >
          <h2 className="text-xl font-bold">{content.title}</h2>
          <p className="text-sm mt-2">{content.description}</p>

          <div className="mt-4 flex flex-col items-center">
            {content.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-2 text-blue-300 hover:underline"
              >
                <img src={link.icon} alt={link.platform} className="w-6 h-6" />
                {link.platform}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ScaleCorrection;
