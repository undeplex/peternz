// components/SlidingText.js

import { useEffect } from 'react';
import gsap from 'gsap';

const SlidingText = () => {
  useEffect(() => {
    // Animate the text infinitely using GSAP
    gsap.to(".slider-text", {
      x: "-100%", // Slide text to the left off-screen
      duration: 100, // Duration of the animation
      repeat: -1, // Infinite repeat
      ease: "linear", // Smooth linear animation
    });
  }, []);

  return (
    <div className="overflow-hidden translate-y-[-74px] text-white w-[120%] translate-x-[-8px] my-8 bg-black py-4 rotate-6  relative ">
      <div className="slider-text inline-block text-xl whitespace-nowrap">
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
        This is an infinitely sliding text example using GSAP in Next.js with Tailwind CSS!
      </div>
    </div>
  );
};

export default SlidingText;