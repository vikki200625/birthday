import React, { useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css'; // Import global styles for slick-carousel theme tweaks

export default function Lightbox({ images, startIndex = 0, onClose }) {
  // If no images or lightbox is somehow opened with empty array, close it.
  if (!images || images.length === 0) {
    onClose();
    return null;
  }

  // Effect to handle Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    // Add class to body to prevent scrolling when lightbox is open
    document.body.classList.add('lightbox-open');
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('lightbox-open');
    };
  }, [onClose]);

  // Slider settings for the lightbox carousel
  const sliderSettings = useMemo(
    () => ({
      dots: true,
      arrows: true,
      infinite: false,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: startIndex, // Start at the clicked image
      adaptiveHeight: true,
      fade: true, // Smooth fade transition for slides
    }),
    [startIndex]
  );

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking on the image area */}
        {images.length > 1 ? (
          <Slider {...sliderSettings} className="lightbox-slider">
            {images.map((url, index) => (
              <div key={index} className="lightbox-slide">
                <img src={url} alt={`Enlarged memory ${index + 1}`} />
              </div>
            ))}
          </Slider>
        ) : (
          <img src={images[0]} alt="Enlarged memory" className="lightbox-single-img" />
        )}
      </div>
      <button className="lightbox-close-btn" onClick={onClose}>&times;</button>
    </div>
  );
}