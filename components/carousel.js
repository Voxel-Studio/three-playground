import { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "../styles/Carousel.module.css";

const Carousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, watchResize: false },
        [Autoplay({ delay: 3500, stopOnInteraction: false })]
    );
    const [activeSlideIndex, setActiveSlideIndex] = useState(1);
    const [progressBarRef, setProgressBarRef] = useState(null);

    const totalSlides = 12;

    useEffect(() => {
        if (!emblaApi) return;
        const updateActiveSlide = () => {
            const index = emblaApi.selectedScrollSnap();
            setActiveSlideIndex(index + 1);
        };

        emblaApi.on("select", updateActiveSlide);
        updateActiveSlide();

        return () => emblaApi.off("select", updateActiveSlide);
    }, [emblaApi]);
    return (
        <div
            className={styles.carouselWrapper}
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className={styles.embla} ref={emblaRef}>
                <div className={styles.embla__container}>
                    <Slide
                        index={1}
                        src="/carousel1.png"
                        slide={activeSlideIndex}
                    />
                    <Slide
                        index={2}
                        src="/carousel2.png"
                        slide={activeSlideIndex}
                    />
                    <Slide
                        index={3}
                        src="/carousel3.png"
                        slide={activeSlideIndex}
                    />
                    <Slide
                        index={4}
                        src="/carousel1.png"
                        slide={activeSlideIndex}
                    />
                    <Slide
                        index={5}
                        src="/carousel2.png"
                        slide={activeSlideIndex}
                    />
                    <Slide
                        index={6}
                        src="/carousel3.png"
                        slide={activeSlideIndex}
                    />
                    <Slide
                        index={7}
                        src="/carousel1.png"
                        slide={activeSlideIndex}
                    />
                    <Slide
                        index={8}
                        src="/carousel2.png"
                        slide={activeSlideIndex}
                    />
                    <Slide
                        index={9}
                        src="/carousel3.png"
                        slide={activeSlideIndex}
                    />
                    <Slide
                        index={10}
                        src="/carousel1.png"
                        slide={activeSlideIndex}
                    />
                    <Slide
                        index={11}
                        src="/carousel2.png"
                        slide={activeSlideIndex}
                    />
                    <Slide
                        index={12}
                        src="/carousel3.png"
                        slide={activeSlideIndex}
                    />
                </div>
            </div>
            <div className={styles.progress}>
                <div className={styles.line}></div>
                <div>
                    {activeSlideIndex > 9
                        ? `0${activeSlideIndex}`
                        : `00${activeSlideIndex}`}
                </div>
                <div ref={setProgressBarRef} className={styles.progress_bar}>
                    <div
                        style={{
                            width: `${(activeSlideIndex / totalSlides) * 100}%`,
                        }}
                        className={styles.progress_thumb}
                    />
                </div>
                <div style={{ opacity: 0.8 }}>012</div>
            </div>
        </div>
    );
};

const Slide = ({ index, src, slide }) => {
    const selected = index === slide;
    return (
        <div className="embla__slide">
            <img
                className={`${styles.slide_image}
                    ${selected ? styles.selected : ""}`}
                src={src}
            />
        </div>
    );
};

export default Carousel;
