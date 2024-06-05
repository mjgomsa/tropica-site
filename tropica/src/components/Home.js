import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { Row, Col, Container } from "react-bootstrap";
import tropicaVidLandscape from "../assets/TropicaFastLandscape.mp4";
import tropicaVidPortrait from "../assets/TropicaFastPortrait.mp4"; // Update file path

export const Home = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Adjust the range and domain according to your video's length and the scroll range
  const playbackRange = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Handle Desktop or Mobile
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768); // Adjust the breakpoint as per your design
    };

    // Set initial state based on screen width
    setIsDesktop(window.innerWidth > 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current; // Store current ref value

    let isVideoLoaded = false;

    const handleMetadataLoaded = () => {
      isVideoLoaded = true;
      console.log("Video metadata loaded, duration:", videoEl.duration);
    };

    if (videoEl) {
      videoEl.addEventListener("loadedmetadata", handleMetadataLoaded);
    }

    const unsubscribe = playbackRange.on("change", (latest) => {
      if (isVideoLoaded && videoEl) {
        const duration = videoEl.duration;
        if (!isNaN(duration)) {
          videoEl.currentTime = latest * duration;
          console.log(
            "Scroll position:",
            latest,
            "Current time:",
            videoEl.currentTime
          );
        }
      }
    });

    return () => {
      if (videoEl) {
        videoEl.removeEventListener("loadedmetadata", handleMetadataLoaded);
      }
      unsubscribe();
    };
  }, [playbackRange]);

  const videoContent = (
    <div
      className="mainDiv"
      style={{
        height: "200vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="fixed">
        <Container fluid className="textContainer">
          <Row>
            <Col>1 of 3</Col>
            <Col xs={6}>2 of 3 (wider)</Col>
            <Col>3 of 3</Col>
          </Row>
        </Container>
      </div>
      <video
        ref={videoRef}
        src={isDesktop ? tropicaVidLandscape : tropicaVidPortrait}
        style={{
          width: "80%",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );

  return videoContent;
};
