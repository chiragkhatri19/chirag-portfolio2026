"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
  memo,
} from "react";
import { ArrowLeft, ArrowRight, X, ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = memo(({ 
  items, 
  initialScroll = 0, 
  autoScroll = true,
  autoScrollInterval = 4000 
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  // Auto scroll functionality - disabled on mobile for better UX
  useEffect(() => {
    if (!autoScroll || isPaused || isMobileView) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScroll - 10) {
          // Reset to beginning with smooth animation
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRight();
        }
      }
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval, isPaused, isMobileView]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  // Memoized scroll handlers
  const scrollLeft = useCallback(() => {
    if (carouselRef.current) {
      const scrollAmount = isMobileView ? 280 : 350;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  }, [isMobileView]);

  const scrollRight = useCallback(() => {
    if (carouselRef.current) {
      const scrollAmount = isMobileView ? 280 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, [isMobileView]);

  const handleCardClose = useCallback((index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 260 : 384;
      const gap = isMobile() ? 16 : 24;
      const scrollPosition = (cardWidth + gap) * index;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }, []);

  const handlePause = useCallback(() => setIsPaused(true), []);
  const handleResume = useCallback(() => setIsPaused(false), []);

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div 
        className="relative w-full"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
      >
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-8 md:py-12 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "flex flex-row justify-start gap-4 sm:gap-6 pl-4",
              "max-w-7xl mx-auto"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.15 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[20%] rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-4">
          <motion.button
            className="relative z-40 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center disabled:opacity-30 shadow-lg"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
          </motion.button>
          <motion.button
            className="relative z-40 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center disabled:opacity-30 shadow-lg"
            onClick={scrollRight}
            disabled={!canScrollRight}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
          </motion.button>
        </div>
        
        {/* Progress indicator */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                "h-1 sm:h-1.5 rounded-full transition-all duration-300",
                index === currentIndex 
                  ? "w-6 sm:w-8 bg-primary" 
                  : "w-1 sm:w-1.5 bg-primary/30"
              )}
            />
          ))}
        </div>
      </div>
    </CarouselContext.Provider>
  );
});

Carousel.displayName = 'Carousel';

export const Card = memo(({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            {/* Glassmorphism backdrop with animated background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0"
            >
              {/* Animated gradient orbs */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute -top-40 -left-40 w-96 h-96 bg-primary/30 rounded-full blur-[100px]"
                  animate={{
                    x: [0, 100, 50, 0],
                    y: [0, 50, 100, 0],
                    scale: [1, 1.2, 0.9, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-1/2 -right-40 w-80 h-80 bg-glow-secondary/30 rounded-full blur-[100px]"
                  animate={{
                    x: [0, -80, -40, 0],
                    y: [0, -60, 40, 0],
                    scale: [1, 0.9, 1.1, 1],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                  className="absolute -bottom-40 left-1/3 w-72 h-72 bg-glow-tertiary/25 rounded-full blur-[100px]"
                  animate={{
                    x: [0, 60, -30, 0],
                    y: [0, -40, 20, 0],
                    scale: [1, 1.1, 0.95, 1],
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                <motion.div
                  className="absolute top-1/4 left-1/2 w-64 h-64 bg-glow-quaternary/20 rounded-full blur-[100px]"
                  animate={{
                    x: [0, -50, 30, 0],
                    y: [0, 70, -30, 0],
                    scale: [1, 0.85, 1.15, 1],
                  }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </div>
              
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-2xl" />
              
              {/* Noise texture */}
              <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
            </motion.div>
            
            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              ref={containerRef}
              className="max-w-4xl mx-auto my-4 sm:my-6 md:my-10 p-1 relative z-[60]"
            >
              {/* Glassmorphism card */}
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden mx-2 sm:mx-4 md:mx-0">
                {/* Header image */}
                <div className="relative h-48 sm:h-56 md:h-80 overflow-hidden">
                  <BlurImage
                    src={card.src}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Close button */}
                  <motion.button
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 h-9 w-9 sm:h-10 sm:w-10 bg-white/20 dark:bg-black/30 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30"
                    onClick={handleClose}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </motion.button>
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-primary text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                    >
                      {card.category}
                    </motion.p>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                    >
                      {card.title}
                    </motion.h2>
                  </div>
                </div>
                
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 sm:p-6 md:p-10 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto"
                >
                  {card.content}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Card button with hover expand */}
      <motion.button
        onClick={handleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col items-start justify-end"
        initial={false}
        animate={{
          height: isMobile ? 320 : (isHovered ? 420 : 380),
          width: isMobile ? 260 : (isHovered ? 340 : 300),
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-glow-secondary/50 to-primary/50 rounded-3xl blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Card container */}
        <div className="relative h-full w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 dark:bg-neutral-900 border border-white/10">
          {/* Image */}
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-500"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
          
          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
            animate={{ x: isHovered ? "200%" : "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          
          {/* Content */}
          <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
            <motion.span
              className="text-primary/90 text-xs sm:text-sm font-medium mb-1 sm:mb-2"
              animate={{ y: isHovered && !isMobile ? -5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {card.category}
            </motion.span>
            <motion.h3
              className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-tight"
              animate={{ y: isHovered && !isMobile ? -5 : 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              {card.title}
            </motion.h3>
            
            {/* View button that appears on hover (desktop) or always shows on mobile */}
            <motion.div
              className="mt-3 sm:mt-4 flex items-center gap-2 text-white/80"
              initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 10 }}
              animate={{ 
                opacity: (isHovered || isMobile) ? 1 : 0, 
                y: (isHovered || isMobile) ? 0 : 10 
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs sm:text-sm font-medium">View Project</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.div>
          </div>
        </div>
      </motion.button>
    </>
  );
});

Card.displayName = 'Card';

export const BlurImage = memo(({
  height,
  width,
  src,
  className,
  alt,
  fill,
  style,
  ...rest
}: {
  height?: number | string;
  width?: number | string;
  src: string;
  className?: string;
  alt?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "transition duration-500",
        isLoading ? "blur-md scale-105" : "blur-0 scale-100",
        fill ? "absolute inset-0 w-full h-full" : "",
        className
      )}
      style={style}
      onLoad={() => setLoading(false)}
      src={src}
      width={width ? Number(width) : undefined}
      height={height ? Number(height) : undefined}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background image"}
      {...rest}
    />
  );
});

BlurImage.displayName = 'BlurImage';
