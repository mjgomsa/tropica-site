import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";
import tropicaVidLandscape from "../assets/TropicaFastLandscape.mp4";
import tropicaVidPortrait from "../assets/TropicaFastPortrait.mp4"; // Update file path
import generaImg from "../assets/Logo-Genera-Simple-tropica.png";

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
      <div className="fixed" id="fixed1">
        <Container fluid>
          <Row>
            <Col>
              <img
                src={generaImg}
                alt={`Genera Logo`}
                style={{ cursor: "pointer", width: "191px" }}
              ></img>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="fixed" id="fixed2">
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs lg="3">
              <p className="bold homeText">
                <br></br>Julio 2026
              </p>
            </Col>
            <Col xs md="auto">
              <h2 className="homeText">La sensualidad de la naturaleza</h2>
            </Col>
            <Col xs lg="3">
              <p className="light homeText" style={{ textAlign: "right" }}>
                Residencias de lujo con 3 habitaciones <br></br>en Nunciatura,
                San José, Costa Rica
              </p>
            </Col>
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
