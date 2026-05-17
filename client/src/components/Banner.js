import React, { useState, useEffect } from "react";
import axios from "axios";

const Banner = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/slider");
        const data = Array.isArray(res.data) ? res.data : [];
        // Chỉ lấy những slide có trạng thái bật (status truthy) và giới hạn 5 mục
        const activeSlides = data.filter((slide) => slide && slide.status).slice(0, 5);
        const slidesWithFullUrl = activeSlides.map((slide) => ({
          ...slide,
          image: slide.image
            ? slide.image.startsWith("http")
              ? slide.image
              : `http://localhost:5000${slide.image}`
            : "",
        }));
        setSlides(slidesWithFullUrl);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrent(index);

  if (!slides.length) return null;

  return (
    <div className="banner-slider">
      <button className="arrow left" onClick={prevSlide}>‹</button>
      <div className="banner-slide">
        <img src={slides[current].image} alt={slides[current].description} />
      </div>
      <button className="arrow right" onClick={nextSlide}>›</button>

      {/* Dot navigation */}
      <div className="banner-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
