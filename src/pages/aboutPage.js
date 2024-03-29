import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-container d-flex col">
      <p className="title bold">About</p>
      <p>
        <span className="appName">Seis Palabras</span> is a web app for Spanish students on which they can try to
        translate six words every day.
      </p>
      <p>
        The list of possible translations consists mostly of nouns, very few adjectives, and zero verbs. If you are
        asked to translate the word
        <span className="possibleWord">&nbsp;book</span>, think about &quot;the
        <span className="possibleWord">&nbsp;book&nbsp;</span>
        you read&quot;, and not &quot;to book a meeting&quot;.
      </p>
      <p>
        You must{" "}
        <NavLink className="myLink" to="/login">
          Log In
        </NavLink>{" "}
        in order to practice and keep track of your progress.
      </p>
      <p className="versionText">
        All the words were double checked with{" "}
        <a href="https://www.deepl.com/es/translator" className="myLink" target="_blank" rel="noreferrer">
          DeepL
        </a>{" "}
        and{" "}
        <a href="https://translate.google.com/?hl=es&tab=TT" target="_blank" className="myLink" rel="noreferrer">
          Google Translator
        </a>
        . If there&apos;s a mistake in any of them, please let me know.
      </p>
      <p className="versionText">
        If you encounter an error or have any suggestion, please{" "}
        <a className="myLink" href="mailto:orozcoding@gmail.com">
          get in touch
        </a>
        .
      </p>
      <p className="versionText">
        Made By{" "}
        <a href="https://github.com/orozCoding" className="myLink">
          orozCoding
        </a>
        .
      </p>
      <p className="versionText small">
        Version: <span className="possibleWord">beta 1.0</span>.
      </p>
    </div>
  );
};

export default About;
