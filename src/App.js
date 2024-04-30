import { useEffect, useState } from "react";
import ArrowDown from "./components/ArrowDown";
import poemChoices from "./assets/poemChoices.json";

function App() {

  const [currentSentence, setCurrentSentence] = useState(poemChoices);

  const [firstChoice, setFirstChoice] = useState(poemChoices.choices[0]);
  const [secondChoice, setSecondChoice] = useState(poemChoices.choices[1]);

  const newVerse = (choosenVerse) => {
    // get poemWrapper div
    const poemWrapper = document.getElementById('poemWrapper');
    if (poemWrapper) {

      // add the choosen verse to the poem
      const newVerse = document.createElement('p');
      newVerse.textContent = choosenVerse.label;
      poemWrapper.appendChild(newVerse);
    }
    if (choosenVerse.choices) {
      // currentSentence become the choosen verse
      setCurrentSentence(choosenVerse);
      /* if there are still possible choices in the new verse, 
      then we change the choices with those of the new currentSentence */
      setFirstChoice(choosenVerse.choices[0]);
      setSecondChoice(choosenVerse.choices[1]);
    } else {
      setCurrentSentence(null);
      setFirstChoice(null)
      setSecondChoice(null)
    }
  }

  const reset = () => {
    // reset with first choices and first currentSentence
    const poemWrapper = document.getElementById('poemWrapper');
    setCurrentSentence(poemChoices);
    poemWrapper.innerHTML = '<p>' + poemChoices.label + ' </p>';
    setFirstChoice(poemChoices.choices[0]);
    setSecondChoice(poemChoices.choices[1]);
  }

  const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // first mount of the page 
  useEffect(() => {
    // get poemWrapper div
    const poemWrapper = document.getElementById('poemWrapper');
    // if div properly mounted
    if (poemWrapper) {
      // set randomColor between 130 and 200
      const randomColor = {
        r: getRandomValue(130, 200),
        g: getRandomValue(130, 200),
        b: getRandomValue(130, 200),
      };
      // If randomColor.green is close to randomColor.red, we adjust the green and blue to avoid a gray background.
      if (randomColor.r + 10 >= randomColor.g && randomColor.g < 10) {
        randomColor.g += 20;
        randomColor.b -= 20;
      }
      // set body background to the new color. 
      document.body.style.backgroundColor = `rgb(${randomColor.r}, ${randomColor.g}, ${randomColor.b})`;

      // Update poemWrapper innerHTML
      poemWrapper.innerHTML = '<p>' + currentSentence.label + ' </p>';
    }
  }, []);


  return (
    <>
      <div id="homeContent">
        <div className="w-full fixed">
          <h1 className="text-4xl px-6 pt-6">A travers vers.</h1>
        </div>
        <div className="w-full pt-56">
          <p className="text-center text-2xl px-56">
            "A travers vers" est une tentative de réponse à la question de l'interactivité en littérature. Face au constat évident que le format du livre limite l'interaction du lecteur avec le texte littéraire, l'enfermant dans le carcan d'une lecture linéaire qui ne laisse pas de place au choix, j'ai essayé de créer une œuvre qui encouragerait une lecture active. En partant d'un premier vers unique, vous serez amenés, à chaque étape, à choisir entre deux vers, créant ainsi votre propre chemin, et composant un poème qui sera propre à votre expérience de lecture.           </p>
        </div>
        <div className="w-full flex justify-center p-36 mb-24">
          <a href="#firstChoice">
            <ArrowDown />
          </a>
        </div>
      </div>
      <div id="gameContent">
        <div id="poemWrapper" className="text-center text-2xl h-[30vh]">
        </div>

        <div className="w-full flex justify-around text-2xl font-bold py-16">
          {currentSentence &&
            <>
              <p id="firstChoice" className="cursor-pointer" onClick={() => newVerse(firstChoice)}>"{firstChoice.label}"</p>
              <p id="secondChoice" className="cursor-pointer" onClick={() => newVerse(secondChoice)}>"{secondChoice.label}"</p>
            </>
          }
        </div>

        <div className="h-[25vh] flex w-full justify-center items-center">
          <button
            className="border border-black rounded-full text-2xl px-6 py-4"
            onClick={() => reset()}
          >
            RÉESSAYER
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
