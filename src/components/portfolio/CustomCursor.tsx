import { useEffect, useRef, memo } from "react";

const CustomCursor = memo(() => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Skip on touch devices for performance
    if (window.matchMedia('(hover: none)').matches || window.innerWidth < 1024) {
      return;
    }

    const dot = dotRef.current;
    const outline = outlineRef.current;
    
    if (!dot || !outline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Use transform for GPU acceleration instead of left/top
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
    };

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      
      // Use transform for GPU acceleration
      outline.style.transform = `translate3d(${outlineX - 20}px, ${outlineY - 20}px, 0)`;
      
      animationFrameRef.current = requestAnimationFrame(animateOutline);
    };

    const handleMouseEnter = () => {
      dot.style.opacity = "1";
      outline.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      dot.style.opacity = "0";
      outline.style.opacity = "0";
    };

    const handleLinkHover = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-hover")
      ) {
        outline.classList.add("hover");
        dot.style.transform = dot.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(1.5)';
      }
    };

    const handleLinkLeave = () => {
      outline.classList.remove("hover");
    };

    // Use passive listeners for better scroll performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleLinkHover, { passive: true });
    document.addEventListener("mouseout", handleLinkLeave, { passive: true });
    
    animationFrameRef.current = requestAnimationFrame(animateOutline);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleLinkHover);
      document.removeEventListener("mouseout", handleLinkLeave);
      
      // Cancel animation frame to prevent memory leak
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ willChange: 'transform, opacity' }} />
      <div ref={outlineRef} className="cursor-outline" style={{ willChange: 'transform, opacity' }} />
    </>
  );
});

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;
