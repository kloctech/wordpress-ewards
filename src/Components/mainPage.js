import React, { useState } from "react";
import Homepage from "../Pages/Homepage";
import Help from "../Pages/Help";
import EwardsConfigForm from "./ewardsConfigForm";

const MainPage = () => {
  const [clickedButton, setClickedButton] = useState("button1");

  const handleButtonClick = (buttonColor) => {
    setClickedButton(buttonColor);
  };

  const [isHover, setIsHover] = useState(false);

  const handleMsgMouseEnter = () => {
    setIsHover(true);
  };

  const handleMsgMouseLeave = () => {
    setIsHover(false);
  };

  const styles = {
    container: {
      width: "100%",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    navbar: {
      borderBottom: "1px solid #ccc",
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#f8f9fa",
      height: "30px",
    },
    logoSection: {
      flex: "0 0 15rem",
      display: "flex",
      alignItems: "center",
    },
    logoText: {
      // fontWeight: "bold",
      fontSize: "1.5rem",
    },
    contactSection: {
      display: "flex",
      alignItems: "center",
    },
    emailLink: {
      color: "inherit",
      textDecoration: isHover ? "underline" : "none",
      marginLeft: "0.5rem",
      cursor: "pointer",
      fontSize: "1rem",
    },
    socialIcons: {
      display: "flex",
      marginLeft: "1rem",
    },
    socialIcon: {
      marginLeft: "1rem",
      color: "#000",
    },
    navSection: {
      display: "flex",
      borderBottom: "1px solid #ccc",
    },
    navPills: {
      display: "flex",
      flexDirection: "column",
      width: "22%",
      padding: "1rem",
    },
    navButton: {
      backgroundColor: "transparent",
      color: "black",
      padding: "0.75rem 1rem",
      textAlign: "left",
      border: "none",
      cursor: "pointer",
      outline: "none",
      margin: "0 0 0.5rem 0",
      fontWeight: "normal",
      fontSize: "1rem",
    },
    activeNavButton: {
      backgroundColor: "#f8f9fa",
      color: "#dd9933",
    },
    tabContent: {
      width: "78%",
      padding: "1rem",
      borderLeft: "1px solid #ccc",
    },
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.logoSection}>
          <h5 style={styles.logoText}>eWards</h5>
        </div>
        <div style={{ display: "flex" }}>
          {" "}
          <svg viewBox="0 0 24 24" width="24px" focusable="false" aria-hidden="true">
            <path d="M0 5.324v10.176a1.5 1.5 0 0 0 1.5 1.5h17a1.5 1.5 0 0 0 1.5-1.5v-10.176l-9.496 5.54a1 1 0 0 1-1.008 0l-9.496-5.54z"></path>
            <path d="M19.443 3.334a1.494 1.494 0 0 0-.943-.334h-17a1.49 1.49 0 0 0-.943.334l9.443 5.508 9.443-5.508z"></path>
          </svg>
          <a style={styles.emailLink} onMouseEnter={handleMsgMouseEnter} onMouseLeave={handleMsgMouseLeave} href="mailto:info@myewards.com?Subject=ewards">
            info@myewards.com
          </a>
        </div>
        <div style={styles.contactSection}>
          <div style={styles.socialIcons}>
            <a href="https://www.instagram.com/myewards/" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
              <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M8 3C5.243 3 3 5.243 3 8v8c0 2.757 2.243 5 5 5h8c2.757 0 5-2.243 5-5V8c0-2.757-2.243-5-5-5H8zm0 2h8c1.654 0 3 1.346 3 3v8c0 1.654-1.346 3-3 3H8c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3zm9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
              </svg>
            </a>
            <a href="http://www.facebook.com/MyeWards/" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
              <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M16.403,9H14V7c0-1.032,0.084-1.682,1.563-1.682h0.868c0.552,0,1-0.448,1-1V3.064c0-0.523-0.401-0.97-0.923-1.005C15.904,2.018,15.299,1.999,14.693,2C11.98,2,10,3.657,10,6.699V9H8c-0.552,0-1,0.448-1,1v2c0,0.552,0.448,1,1,1l2-0.001V21c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-8.003l2.174-0.001c0.508,0,0.935-0.381,0.993-0.886l0.229-1.996C17.465,9.521,17.001,9,16.403,9z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
      <div style={styles.navSection}>
        <div style={styles.navPills}>
          <button
            style={{
              ...styles.navButton,
              ...(clickedButton === "button1" ? styles.activeNavButton : {}),
            }}
            onClick={() => handleButtonClick("button1")}
          >
            Home
          </button>
          <button
            style={{
              ...styles.navButton,
              ...(clickedButton === "button2" ? styles.activeNavButton : {}),
            }}
            onClick={() => handleButtonClick("button2")}
          >
            eWards Configuration
          </button>
          <button
            style={{
              ...styles.navButton,
              ...(clickedButton === "button3" ? styles.activeNavButton : {}),
            }}
            onClick={() => handleButtonClick("button3")}
          >
            Help
          </button>
        </div>
        <div style={styles.tabContent}>
          {clickedButton === "button1" && <Homepage />}
          {clickedButton === "button2" && <EwardsConfigForm />}
          {clickedButton === "button3" && <Help />}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
