import { useParallax } from "../../hooks/useParallax";

// Background grid with parallax effect
export const Background: React.FC = () => {
  const offset = useParallax(0.015); 
  return (
    <div 
      className="absolute -inset-25 pointer-events-none z-0 chaos-grid opacity-30 transition-transform duration-75 ease-out"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    />
  );
};