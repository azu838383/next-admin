import { useEffect } from 'react';

const CustomScrollLock: React.FC = () => {
  let startY = 0;

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent):void => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent):void => {
      const currentY = e.touches[0].clientY;

      if (currentY > startY + 20) {
        e.preventDefault();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });

    window.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return null;
};

export default CustomScrollLock;
