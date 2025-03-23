import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const Loading: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const emoji: {emoji:string, color: string }[] = [
    { emoji: "😊", color: "#FFEB3B"},
    { emoji: "😡", color: "#F44336"},
    { emoji: "😈", color: "#9C27B0"},
    { emoji: "🙂", color: "#2196F3"},
    { emoji: "😩", color: "#BDBDBD"},
    { emoji: "😏", color: "#FF5722"},
    { emoji: "🥱", color: "#81C784"},
];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % emoji.length);
    }, 1500);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div 
        animate={{opacity: [0.5,1,0.5]}}
        transition={{duration: 1, repeat:Infinity}}
        className="flex flex-col items-center justify-center h-screen">
            <p className="text-xl mb-4 text-gray-600">Generazione in corso...</p>

            <div className="relative w-24 h-24 flex items-center justify-center border-4 border-gray-300 rounded-full overflow-hidden">
                <AnimatePresence mode="wait">
                    {/* Cerchio attorno */}
                    <motion.div 
                    key={emoji[index].color}
                    initial={{y:100}}
                    animate={{y: 0}}
                    exit={{y:100}}
                    transition={{duration:0.7, ease: "easeInOut"}}
                    className={`bg-[${emoji[index].color}] absolute w-full h-full opacity-50  rounded-full`}/>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.span
                        key={emoji[index].emoji}
                        initial={{ x: -70, opacity: 0.8, scale: 0.7 }}
                        animate={{ x: 0, opacity: 1, scale: 0.9 }}
                        exit={{ x: 70, opacity: 0.8, scale: 0.7 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className="text-6xl">
                            {emoji[index].emoji}
                    </motion.span>
                </AnimatePresence>
            </div>
    </motion.div>
  );
};

export default Loading;
