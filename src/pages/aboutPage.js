import React from "react";

const About = () => {
  return (
    <div className="about-container d-flex col">
      <p className="title bold">About</p>
      <p><span className="appName">Seis Palabras</span> is a web app for Spanish students on which they can try to translate 3 words every day.</p>
      <p>The app currently work with the local memory of the browser. Which means that the user will be able
        to keep and track their progress as long as they always visit the app from the same device and browser
        and without deleting or clearing browser memory.
      </p>
      <p>Made By <a href="https://github.com/orozCoding" className="myLink">orozCoding</a>.</p>
      <p>If you have any suggestion, please <a className="myLink" href="mailto:orozcoding@gmail.com">contact me</a>.</p>
    </div>
  )
};

export default About;