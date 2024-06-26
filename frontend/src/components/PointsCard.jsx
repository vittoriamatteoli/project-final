import { useEffect, useState } from "react";
import { BatterySlider } from "../reusables/BatterySlider";
import { useMediaQuery } from "react-responsive";
import { useContext } from "react";
import { DashboardContext } from "./DashboardContext";
import styled, { keyframes } from "styled-components";
import info from "../assets/info.svg";

//define keyframes for animation
const updateAnimation = keyframes`
 0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1.5); }
`;

//styled component for points with animation
const AnimatedPoints = styled.h3`
  color: var(--ego-green);
  font-size: 24px;
  font-weight: 800;
  margin: 10px 0 100px 0;

  &.animate {
    animation: ${updateAnimation} 0.5s ease-in-out;
  }

  @media (min-width: 768px) {
    font-size: 32px;
  }
  @media (min-width: 1024px) {
    font-size: 36px;
  }
`;

const apikey = import.meta.env.VITE_API_KEY;

const StyledWrapper = styled.div`
  text-align: right;
  font-size: 12px;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1024px) {
    font-size: 24px;
  }

  h2 {
    text-align: left;
  }
  h3 {
    color: var(--ego-green);
  }
`;

const StyledSection = styled.section`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  @media (min-width: 768px) {
    justify-content: flex-end;
  }
  .a {
    font-size: 24px;
  }

  svg {
    width: 50px;
    height: 50px;
  }
`;

const PopUpOverlay = styled.div`
  z-index: 20;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopUpContent = styled.div`
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 250px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  background: linear-gradient(180deg, #dcded0 82.22%, #cce0a1 100%);
  h2 {
    font-size: 15px;
  }
  svg {
    width: 100px;
    height: 100px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: visible;
  visibility: visible;
`;

export const PointsCard = ({ id }) => {
  const { points, setPoints } = useContext(DashboardContext);
  const [showPopUp, setShowPopUp] = useState(false);
  //new for animation
  const [animate, setAnimate] = useState(false);

  const API = `${apikey}/user/${id}`;

  // Fetch points
  useEffect(() => {
    const handlePoints = async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        if (data.points !== undefined && data.points !== null) {
          setPoints((prevPoints) => {
            if (prevPoints !== data.points) {
              setAnimate(true); //set animation
              setTimeout(() => setAnimate(false), 500); //reset animation after 0.5s
            }
            return data.points;
          });
        }
      } catch (error) {
        console.error("Error fetching energy data:", error);
      }
    };

    // Call handlePoints immediately and then every 5 seconds
    handlePoints();
    const intervalId = setInterval(handlePoints, 5000);
    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [API, setPoints]);

  const togglePopUp = () => {
    if (event.type === "click") {
      setShowPopUp(!showPopUp);
    }
  };

  // Media query for mobile devices
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <StyledWrapper>
      <StyledHeader role="banner">
        <h2>Dashboard</h2>
      </StyledHeader>
      <StyledSection>
        {isMobile && <p>Your Energy Level</p>}
        <a>
          Your Points
          <span>
            <img src={info} alt="information-icon" />
          </span>
        </a>
      </StyledSection>
      <hr />
      <StyledSection>
        {isMobile && (
          <a onClick={togglePopUp}>
            <BatterySlider id={id} />
          </a>
        )}
        <AnimatedPoints className={animate ? "animate" : ""}>
          {points}
        </AnimatedPoints>
      </StyledSection>
      {showPopUp && (
        <PopUpOverlay onClick={togglePopUp}>
          <PopUpContent>
            <BatterySlider id={id} showPopUp={showPopUp} />
          </PopUpContent>
        </PopUpOverlay>
      )}
    </StyledWrapper>
  );
};
