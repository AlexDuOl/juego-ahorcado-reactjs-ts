import { useEffect, useState } from 'react'
import { HangImage } from './components/HangImage'
import { letters } from './helpers/letters'
import { getRandomWord } from './helpers/getRandomWord';

import './App.css'

function App() {

  const [ word, setWord ] = useState(getRandomWord());
  const [ hiddenWord, setHiddenWord ] = useState('_ '.repeat( word.length ));
  const [ attemps, setAttemps ] = useState(0);
  const [ lose, setLose ] = useState(false);
  const [ won, setWon ] = useState(false);

  //Determinar si la persona perdió
  useEffect(() => {
    if(attemps >= 9){
      setLose(true)
    }
  }, [ attemps ]);

  //Determinar si la persona ganó
  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(' ').join('');

    if(currentHiddenWord === word){
      setWon(true)
    }
  }, [ hiddenWord ])

  const checkLetter = ( letter: string ) => {
    if(lose) return;
    if(won) return;

    if(!word.includes(letter)){
      setAttemps( Math.min( attemps + 1, 9 ) );
      return
    }

    const hiddenWordArray = hiddenWord.split(' ');

    for(let i = 0; i < word.length; i++){
      if(word[i] === letter){
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWord(hiddenWordArray.join(' '));
    
  }

const newGame = () => {
  const newWord = getRandomWord();

  setWord(newWord);
  setHiddenWord('_ '.repeat( newWord.length ));
  setAttemps(0);
  setLose(false);
  setWon(false);
}

  return (
    <div className="App">
      {/* Imagenes */}
      <HangImage imageNumber={ attemps } />

      {/* Palabra oculta */}
      <h3>{ hiddenWord } </h3>

      {/* Control de intentos */}
      <h3>Intentos: {attemps} </h3>

      {/* Mensaje si perdió */}
      {
        (lose) 
          ? <h2>Perdió, la palabra correcta era {word}</h2>
          :''
      }

      {/* Mensaje si ganó */}
      {
        (won) 
          ? <h2>¡Felicidades, usted ganó!</h2>
          :''
      }

      {/* Botones de letras */}
      {
        letters.map( (letter) => {
          return (
            <button
              onClick={ () => checkLetter(letter) }
              key={ letter }>
                { letter }
            </button>
          )
        })
      }

      <br /><br />
      <button onClick={ newGame } >¿Nuevo juego?</button>
    </div>
  )
}

export default
App
