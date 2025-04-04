"use client";
import React, { useState, useRef } from "react";
import Button from "./Button";

const videoSrc1 = "/videos/hero-1.mp4";
const videoSrc2 = "/videos/hero-2.mp4";
const videoSrc3 = "/videos/hero-3.mp4";
const videoSrc4 = "/videos/hero-4.mp4";

const Hero = () => {
  const videos = [videoSrc1, videoSrc2, videoSrc3, videoSrc4];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Create refs for each video element
  const currentVideoRef = useRef<HTMLVideoElement | null>(null);
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);
  const upVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoLoad = () => {
    if (currentVideoRef.current && nextVideoRef.current && upVideoRef.current) {
      setIsLoading(false);
    }
  };

  const handleVideoClick = () => {
    setHasClicked(true);
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentIndex(nextIndex);

    // Save the current playback time of nextVideo before changing its source
    const nextVideoCurrentTime = nextVideoRef.current?.currentTime;

    // Update video sources directly in the click handler
    if (currentVideoRef.current && nextVideoRef.current && upVideoRef.current) {
      currentVideoRef.current.src = videos[(nextIndex + 1) % videos.length];
      nextVideoRef.current.src = videos[(nextIndex + 2) % videos.length];
      upVideoRef.current.src = videos[nextIndex];

      // If nextVideo was playing, restore its playback time and transfer it to upVideo
      if (nextVideoCurrentTime !== undefined) {
        upVideoRef.current.currentTime = nextVideoCurrentTime;
        upVideoRef.current.play();
      }

      // Play the other videos when clicked
      currentVideoRef.current.play();
      nextVideoRef.current.play();
    }
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh wsc overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
              <video
                loop
                // autoPlay
                ref={currentVideoRef}
                className="size-64 origin-center scale-150 object-center object-cover"
                onLoadedData={handleVideoLoad}
                onClick={handleVideoClick}
              >
                <source
                  src={videos[(currentIndex + 1) % videos.length]}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>

        <div>
          <video
            loop
            muted
            ref={nextVideoRef}
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          >
            <source
              src={videos[(currentIndex + 2) % videos.length]}
              type="video/mp4"
            />
          </video>

          <video
            loop
            muted
            ref={upVideoRef}
            className="absolute left-0 top-0 size-full object-cover object-center"
          >
            <source src={videos[currentIndex]} type="video/mp4" />
          </video>
        </div>

        <h1 className="z-40 font-zentry hero-heading absolute bottom-5 right-5 text-blue-75">
          G<b className="font-zentry special-font">a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="hero-heading font-zentry text-blue-100">
              redefi<b className="font-zentry special-font">n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
