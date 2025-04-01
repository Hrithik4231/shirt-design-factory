
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTShirtProps {
  imageUrl: string;
  className?: string;
}

const RotatingTShirt = ({ imageUrl, className = "" }: RotatingTShirtProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      containerRef.current.style.transform = `
        perspective(1000px)
        rotateY(${x * 20}deg)
        rotateX(${-y * 20}deg)
      `;
    };
    
    const handleMouseLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className={`${className} transition-transform duration-300`} ref={containerRef}>
      <AnimatePresence>
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img 
            src={imageUrl} 
            alt="T-shirt Preview" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingTShirt;
