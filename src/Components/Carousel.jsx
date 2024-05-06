import "../Styles/Carousel.css";
import ImgLandscape1 from "../Assets/Images/landscape(1).jpeg";
import ImgLandscape2 from "../Assets/Images/landscape(2).jpg";
import ImgLandscape3 from "../Assets/Images/landscape(3).jpg";
import ImgLake from "../Assets/Images/lake.jpg";
import ImgHorse from "../Assets/Images/horse.jpg";
import { useEffect, useRef, useState } from "react";

/**
 * This function can be used to create image object which will be used in slides inside carousel
 * @param {string} url URL of image or path of an image
 * @param {string} alt Alternate text to be displayed for image
 * @param {string} description Description of image that you want to show to user
 * @returns Object of image to use in slide
 */
const createImageObj = (url, alt, description) => {
  return { url, alt, description };
};

/**
 * Array of image objects
 */
const images = [
  createImageObj(
    ImgLandscape1,
    "Sunset with mountains",
    "Life is very beautiful, you just need to live it."
  ),
  createImageObj(
    ImgLandscape2,
    "Afternoon on the top of mountain",
    "Everywhere you go, make sure you are aware of surroundings"
  ),
  createImageObj(
    ImgLandscape3,
    "Beautiful sunset",
    "Every sunset tells that every time you won't be under the lights, be strong to face darks also"
  ),
  createImageObj(
    ImgLake,
    "Lake image",
    "Did you know? Fish can't breathe outside of water :)"
  ),
  createImageObj(
    ImgHorse,
    "Sad horse",
    "Never loose hopes when there is nothing happening according to you, be patient!"
  ),
];

function Carousel() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  // Array of references of image slides inside slideshow
  const refSlides = useRef([]);
  // Array of references of indicator div's that are designeted for target slideshow
  const refIndicator = useRef([]);

  /**
   * Handles click for prev button in slideshow
   * @param {Event} e OnClick event caused by prev button click
   */
  const handlePrev = (e = null) => {
    if (activeSlideIndex === 0)
      setActiveSlideIndex(refSlides.current.length - 1);
    else setActiveSlideIndex(activeSlideIndex - 1);
  };
  /**
   * Handles click for next button in slideshow
   * @param {Event} e OnClick event caused by next button click
   */
  const handleNext = (e = null) => {
    setActiveSlideIndex((activeSlideIndex + 1) % refSlides.current.length);
  };

  useEffect(() => {
    /*THIS IS TO SET AUTO SLIDE
    setTimeout(() => {
      refSlides.current = refSlides.current.map((item, i) => {
        if (activeSlideIndex === i) item.style.display = "block";
        else item.style.display = "none";
        return item;
      });
      handleNext();
    }, 2000);
    */

    /**
     * Here we are re-assigning refSlides with updated slides objects
     * For active slide set display property to "block" otherwise "none" to hide
     */
    refSlides.current = refSlides.current.map((item, i) => {
      item.style.display = activeSlideIndex === i ? "block" : "none";
      return item;
    });

    /**
     * We re-assigned indicators references with updated as per current active slide index
     * For active slide set color to "#696969" otherwise "#b2b2b2"
     */
    refIndicator.current = refIndicator.current.map((item, i) => {
      item.style.backgroundColor =
        activeSlideIndex === i ? "#515151" : "#b2b2b2";
      return item;
    });
  }, [activeSlideIndex]);

  return (
    <div className="container-slideshow">
      {/* Slides */}
      {images.map((item, i) => {
        return (
          <div
            className="container-slide"
            key={i}
            ref={(obj) => (refSlides.current[i] = obj)}
          >
            <div className="container-slide-image">
              <img
                className="swipe"
                src={item.url}
                alt={item.alt}
                style={{ height: "100%" }}
              />
            </div>
            <div className="slide-text swipe">{item.description}</div>
          </div>
        );
      })}
      <div id="prev" onClick={(e) => handlePrev(e)}>
        {"<"}
      </div>
      <div id="next" onClick={(e) => handleNext(e)}>
        {">"}
      </div>
      {/* Indicator */}
      <div className="container-slide-indicator">
        {images.map((item, i) => {
          return (
            <div
              className="dot"
              id={i}
              key={i}
              ref={(obj) => (refIndicator.current[i] = obj)}
              onClick={(e) => {
                /**
                 * When directly clicked on indicator, update current active slide index with updated/selected one
                 */
                setActiveSlideIndex(parseInt(e.target.id));
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
