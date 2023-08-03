import './ImageSlider.css';
import React, { useState, useRef, useEffect } from 'react';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex(((currentIndex >= 0 ? currentIndex : 0) + 1) % images.length)
  };
  const prevSlide = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  const handleDragStart = (e) => {
    setStartX(e.clientX || e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setStartX(0);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const slider = sliderRef.current;
    const moveX = (e.clientX || e.touches[0].clientX) - startX;
    if (moveX > 50) {
      prevSlide();
      setStartX(0);
      setIsDragging(false);
    } else if (moveX < -50) {
      nextSlide();
      setStartX(0);
      setIsDragging(false);
    }
  };
  // Function to auto change image every 3 seconds
  useEffect(() => {
    if(currentIndex === NaN){
      setCurrentIndex(0)
    }
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentIndex]); // Re-run the effect whenever currentIndex changes


  return (
    <div
      className="slider-container"
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDragMove}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      onTouchMove={handleDragMove}
    >
      <div className="slider" ref={sliderRef} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} draggable={false} />
        ))}
      </div>
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={currentIndex === index ? 'dot active' : 'dot'}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
