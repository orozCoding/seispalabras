import React from "react";

const About = () => {
  return (
    <div className="about-container d-flex col">
      <p className="title bold">About</p>
      <p><span className="appName">Seis Palabras</span> is a web app for Spanish students on which they can try to translate 3 words every day.</p>
      <p>The list of possible translations consists mostly of nouns, very few adjectives, and zero verbs.
        If you are asked to translate the word <span className="possibleWord">book</span>, think about "the <span className="possibleWord">book</span> you read", and not "to book a meeting".</p>
      <p>The app currently works with the local memory of the browser.
        This means that the you'll be able to keep and track your progress as long as you always visit the app from the same device and browser, and without deleting or clearing the browser memory.</p>
      <p>Made By <a href="https://github.com/orozCoding" className="myLink">orozCoding</a>.</p>
      <p>If you have any suggestion, please <a className="myLink" href="mailto:orozcoding@gmail.com">get in touch</a>.</p>
      <p clasName="version">Version: <span className="possibleWord">beta 0.2.0</span>.</p>
    </div>
  )
};

export default About;