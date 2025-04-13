"use client";
import React, { useState } from "react";
import Button from "./Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const videoSrc1 = "/videos/hero-1.mp4";
const videoSrc2 = "/videos/hero-2.mp4";
const videoSrc3 = "/videos/hero-3.mp4";
const videoSrc4 = "/videos/hero-4.mp4";

const Hero = () => {
  const videos = [videoSrc1, videoSrc2, videoSrc3, videoSrc4];

  const [currentTime, setCurrentTime] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedvideos, setLoadedvideos] = useState(0);

  const handleVideoLoad = () => {
    setLoadedvideos((prev) => prev + 1);
  };

  const handleVideoClick = (event: React.MouseEvent<HTMLVideoElement>) => {
    setHasClicked(true);
    const videoElement = event.currentTarget;
    const time = videoElement.currentTime;

    setCurrentTime(time);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const getVideos = (index: number) => videos[index];

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {},
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh wsc overflow-hidden bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
              <video
                key={`${videos[currentIndex]}-1`}
                loop
                autoPlay
                id="current-video"
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
            key={`${videos[currentIndex]}-2`}
            loop
            autoPlay
            muted
            id="next-video"
            onLoadedData={handleVideoLoad}
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          >
            <source src={getVideos(currentIndex)} type="video/mp4" />
          </video>

          <video
            key={`${videos[currentIndex]}-3`}
            loop
            autoPlay
            muted
            id="up-vid"
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={(event) => {
              handleVideoLoad();
              event.currentTarget.currentTime = currentTime; // Restore playback position
            }}
          >
            <source src={getVideos(currentIndex)} type="video/mp4" />
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

            <Button></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
