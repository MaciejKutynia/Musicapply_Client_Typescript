import React, { useState, useEffect } from "react";

//assets
import mainImg from "assets/images/main_page.png";
import arrowImg from "assets/images/arrow.svg";

const LandingPage: React.FC = () => {
  //states
  const [load, setLoad] = useState<boolean>(false);
  const [top, setTop] = useState<number>(0);

  //effects
  useEffect(() => {
    window.addEventListener("load", function () {
      setTimeout(() => {
        setLoad(true);
      }, 1000);
    });
  }, [load]);

  //functions
  const addSongHandler = () => {
    console.log("click");
    setTop(100);
  };

  //verify later
  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    console.log(e);
    console.log("123");
  };

  return (
    <div
      className="landing-page"
      style={{ top: `${top}%` }}
      onScroll={scrollHandler}>
      <div className={load ? "help visible" : "help"}>
        <span>
          Pomóż nam powiększać bibliotekę. Dodaj swoje ulubione piosenki.
        </span>
        <button className="btn" onClick={addSongHandler}>
          Dodaj
        </button>
      </div>
      <img src={mainImg} alt="logo" className="main-img" />
      <div className="scroll" onClick={() => setTop(100)}>
        <img src={arrowImg} alt="arrow scroll" />
      </div>
    </div>
  );
};

export default LandingPage;
