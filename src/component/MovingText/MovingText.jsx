import { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";

const MovingText = ({ text }) => {
  const textWrapperRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const animateText = () => {
      const textWrapper = textWrapperRef.current;
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );

      timelineRef.current = anime
        .timeline({
          loop: true,
        })
        .add({
          targets: ".animated_text .letter",
          opacity: [0, 1],
          easing: "easeInOutQuad",
          duration: 2250,
          delay: (el, i) => 150 * (i + 1),
        })
        .add({
          targets: ".animated_text",
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000,
        });
    };

    animateText();
  }, [text]);

  return (
    <span ref={textWrapperRef} className="animated_text">
      {text}
    </span>
  );
};

export default MovingText;
