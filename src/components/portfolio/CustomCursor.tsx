import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      dot.style.transform = "translate(-50%, -50%)";
    };

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      
      outline.style.left = `${outlineX}px`;
      outline.style.top = `${outlineY}px`;
      outline.style.transform = "translate(-50%, -50%)";
      
      requestAnimationFrame(animateOutline);
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
        dot.style.transform = "translate(-50%, -50%) scale(1.5)";
      }
    };

    const handleLinkLeave = () => {
      outline.classList.remove("hover");
      dot.style.transform = "translate(-50%, -50%) scale(1)";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleLinkHover);
    document.addEventListener("mouseout", handleLinkLeave);
    
    animateOutline();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleLinkHover);
      document.removeEventListener("mouseout", handleLinkLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  );
};

export default CustomCursor;
