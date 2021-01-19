import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card/Card';
import cardsData from './providers/data/cardsData';

const App = () => {

  const [play, setPlay] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [canClickOther, setCanClickOther] = useState(true);
  const [cards, setCards] = useState([]);

  const playGame = () => {
    setPlay(!play);
    setCards(shuffle(cardsData));
  }

  const playAgainGame = () => {
    setCanClickOther(true);
    setSelectedCards([]);
    setCards([]);
    let newCards = cardsData.map(data => {return {...data, stayFlipped: false}});
    setCards(shuffle(newCards));
  }

  const onSelectCard = (objSelected) => {
    const isSameCard = selectedCards.filter(card => card.id === objSelected.id).length > 0 ? true : false;
    if (!isSameCard) {
      let newArray = [...selectedCards];
      newArray.push(objSelected);
      setSelectedCards(newArray);
    } else {
      let cardIndex = selectedCards.findIndex(card => card.id === objSelected.id);
      let newArray = [...selectedCards];
      newArray.splice(cardIndex, 1);
      setSelectedCards(newArray);
    }
  }

  const checkIfIsRight = () => {
    if (selectedCards[0].id === selectedCards[1].idMatch || selectedCards[1].id === selectedCards[0].idMatch) {
      let newCards = [...cards];
      let fisrtSelectedIndex = cards.findIndex(selected => selected.id === selectedCards[0].id)
      let secondSelectedIndex = cards.findIndex(selected => selected.id === selectedCards[1].id)

      newCards[fisrtSelectedIndex].stayFlipped = true;
      newCards[secondSelectedIndex].stayFlipped = true;

      setCards(newCards);
      setCanClickOther(true);
      setSelectedCards([]);
    } else {
      setTimeout(() => {
        setSelectedCards([]);
        setCanClickOther(true);
      }, 1000);
    }
  }

  const shuffle = (array) => {
    return array.sort(() => .5 - Math.random());
  }

  useEffect(() => {
    if (selectedCards.length === 2) {
      setCanClickOther(false);
      checkIfIsRight();
    }
  }, [selectedCards]);

  return (
    <>
      <div className="header">
        <h2>Memory game of Dota 2!</h2>
        {play ? (
          <button onClick={playAgainGame}>Play again</button>
        ) : (
          <button onClick={playGame}>Play</button>
        )}
      </div>

      {play === true &&
        <div className="cards-container">
          <div className="row">
            {cards.map(obj =>
              <Card key={obj.id} obj={obj} cards={selectedCards} onClick={canClickOther} selectCard={onSelectCard} />
            )}
          </div>
        </div>
      }
    </>
  );
}

export default App;
