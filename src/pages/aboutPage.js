import { useEffect, useState } from "react";
import { fetchAllWords } from "../redux/shared/fetches";

const About = () => {
  const [words, setWords] = useState(100);

  useEffect(() => {
    const words = async () => {
      const words = await fetchAllWords();
      setWords(words)
      return words
    };
    words();
  }, [])

  return (
    <div className="about-container d-flex col">
      <p className="title bold">About</p>
      <p><span className="appName">Seis Palabras</span> is a web app for Spanish students on which they can try to translate six words every day.</p>
      <p>The list of possible translations consists mostly of nouns, very few adjectives, and zero verbs.
        If you are asked to translate the word <span className="possibleWord">book</span>, think about "the <span className="possibleWord">book</span> you read", and not "to book a meeting".</p>
      <p>The app currently works with the local memory of the browser.
        This means that you'll be able to keep and track your progress as long as you always visit the app from the same device and browser, and without deleting or clearing the browser memory.</p>
      <p>Made By <a href="https://github.com/orozCoding" className="myLink">orozCoding</a>.</p>
      <p className="versionText">All the words were double checked with <a href="https://www.deepl.com/es/translator" className="myLink" target='_blank' rel="noreferrer">DeepL</a> and <a href="https://translate.google.com/?hl=es&tab=TT" target='_blank' className="myLink" rel="noreferrer">Google Translator</a>.
        If there's a mistake in any of them, please let me know.
      </p>
      <p className="versionText">If you have any suggestion, please <a className="myLink" href="mailto:orozcoding@gmail.com">get in touch</a>.</p>
      <p className="versionText">Total words added: <span className="possibleWord">{words.length}</span>. Goal: 2,232.</p>
      <p className="finalMsg small">Version: <span className="possibleWord">beta 0.4.1</span>.</p>
    </div>
  )
};

export default About;