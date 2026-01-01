"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.1),
      }
    );
  }, [scope, animate, filter, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="leading-snug tracking-wide">{renderWords()}</div>
      </div>
    </div>
  );
};

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    animate(
      "span",
      {
        display: "inline-block",
        opacity: 1,
        width: "fit-content",
      },
      {
        duration: 0.3,
        delay: stagger(0.05),
        ease: "easeInOut",
      }
    ).then(() => setIsAnimationComplete(true));
  }, [animate, scope]);

  return (
    <div
      className={cn(
        "text-center text-base sm:text-xl md:text-3xl lg:text-5xl font-bold",
        className
      )}
    >
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    "hidden opacity-0",
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-primary ml-1",
          cursorClassName,
          isAnimationComplete ? "animate-blink" : ""
        )}
      ></motion.span>
    </div>
  );
};

// Scramble/Jumble text effect - smooth professional animation
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      const nextIndex = (currentIndex + 1) % words.length;
      const targetWord = words[nextIndex];
      
      // Smooth scramble animation
      let frame = 0;
      const totalFrames = 20; // Total animation frames
      const frameSpeed = 40; // ms per frame - smooth 25fps
      
      const scrambleInterval = setInterval(() => {
        const progress = frame / totalFrames;
        const revealedCount = Math.floor(progress * targetWord.length);
        
        setDisplayText(
          targetWord
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              // Already revealed characters
              if (index < revealedCount) {
                return targetWord[index];
              }
              // Scrambling characters
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        
        frame++;
        
        if (frame >= totalFrames) {
          clearInterval(scrambleInterval);
          setDisplayText(targetWord);
          setCurrentIndex(nextIndex);
          setIsAnimating(false);
        }
      }, frameSpeed);
      
    }, duration);
    
    return () => clearInterval(interval);
  }, [currentIndex, words, duration]);

  return (
    <motion.span 
      className={cn("inline-block text-gradient", className)}
      animate={{ opacity: isAnimating ? 0.95 : 1 }}
      transition={{ duration: 0.1 }}
    >
      {displayText}
    </motion.span>
  );
};
