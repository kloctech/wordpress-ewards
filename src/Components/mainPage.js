import React, { useState, useEffect } from "react";
import axios from "axios";
import Homepage from "../Pages/Homepage";
import Help from "../Pages/Help";
import EwardsConfigForm from "./ewardsConfigForm";
import { Link } from "react-router-dom";

const mainPage = () => {
  const [clickedButton, setClickedButton] = useState("button1");

  const handleButtonClick = (buttonColor) => {
    setClickedButton(buttonColor);
  };

  const textFont = {
    fontWeight: "600",
    width: "22%",
  };

  const getButtonStyles = (buttonColor) => {
    return {
      backgroundColor: clickedButton === buttonColor ? "transparent" : "transparent",
      color: clickedButton === buttonColor ? "#dd9933" : "black",
      margin: "0",
    };
  };

  const [isHover, setIsHover] = useState(false);

  const handleMsgMouseEnter = () => {
    setIsHover(true);
  };

  const handleMsgMouseLeave = () => {
    setIsHover(false);
  };

  const msgStyle = {
    color: "inherit",
    textDecoration: isHover ? "underline" : "none",
  };

  return (
    <React.Fragment>
      <div>
        <nav className="border-bottom navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="d-flex w-100">
              <div className="d-flex" style={{ flex: "0 0 15rem" }}>
                <h5>eWards</h5>
              </div>
              <div className="d-flex" style={{ flex: "1 1 auto" }}>
                <div className="w-100 d-flex justify-content-center">
                  <svg viewBox="0 0 24 24" width="24px" focusable="false" aria-hidden="true">
                    <path d="M0 5.324v10.176a1.5 1.5 0 0 0 1.5 1.5h17a1.5 1.5 0 0 0 1.5-1.5v-10.176l-9.496 5.54a1 1 0 0 1-1.008 0l-9.496-5.54z"></path>
                    <path d="M19.443 3.334a1.494 1.494 0 0 0-.943-.334h-17a1.49 1.49 0 0 0-.943.334l9.443 5.508 9.443-5.508z"></path>
                  </svg>
                  <a style={msgStyle} onMouseEnter={handleMsgMouseEnter} onMouseLeave={handleMsgMouseLeave} href="mailto:info@myewards.com?Subject=ewards">
                    info@myewards.com
                  </a>
                </div>
                <div className="">
                  <div className="d-flex flex-row-reverse">
                    <a className="ps-4" href="http://www.facebook.com/MyeWards/" target="blank">
                      <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                        {" "}
                        <path d="M16.403,9H14V7c0-1.032,0.084-1.682,1.563-1.682h0.868c0.552,0,1-0.448,1-1V3.064c0-0.523-0.401-0.97-0.923-1.005 C15.904,2.018,15.299,1.999,14.693,2C11.98,2,10,3.657,10,6.699V9H8c-0.552,0-1,0.448-1,1v2c0,0.552,0.448,1,1,1l2-0.001V21 c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-8.003l2.174-0.001c0.508,0,0.935-0.381,0.993-0.886l0.229-1.996 C17.465,9.521,17.001,9,16.403,9z" />
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/myewards/" target="blank">
                      <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                        {" "}
                        <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="border-bottom d-flex align-items-start">
          <div style={textFont} className="nav flex-column nav-pills  align-items-start" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button style={getButtonStyles("button1")} onClick={() => handleButtonClick("button1")} className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
              Home
            </button>
            <button style={getButtonStyles("button2")} onClick={() => handleButtonClick("button2")} className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
              eWards Configuration
            </button>
            <button style={getButtonStyles("button3")} onClick={() => handleButtonClick("button3")} className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">
              Help
            </button>
          </div>
          <div className="tab-content pb-4 w-100 border-start" id="v-pills-tabContent">
            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
              <Homepage />
            </div>
            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
              <EwardsConfigForm />
            </div>
            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
              <Help />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default mainPage;
