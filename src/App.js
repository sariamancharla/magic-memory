import './App.css'
import { useEffect, useState } from 'react'
import  SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png",matched:false },
  { "src": "/img/potion-1.png",matched:false },
  { "src": "/img/ring-1.png",matched:false },
  { "src": "/img/scroll-1.png" ,matched:false},
  { "src": "/img/shield-1.png",matched:false },
  { "src": "/img/sword-1.png" ,matched:false},
]

function App() {
  
  const [cards, setCards]=useState([])
  const [turns, setTurns]=useState(0)
  const [choiceOne, setChoiceOne]=useState(null)
  const [choiceTwo, setChoiceTwo]=useState(null)
  const [disabled, setdisabled]=useState(false)
  //Shuffle Cards

  const shuffleCards=()=>{
    //spread array twice
    const shuffledCards=[...cardImages,...cardImages]
        .sort(()=>Math.random()-0.5)//sometimes negative sometimes positive
        .map((card)=>({...card,id:Math.random()}))

        setChoiceOne(null)
        setChoiceTwo(null)
        
        setCards(shuffledCards)
        setTurns(0)
  }

    //handle a choice
    const handleChoice=(card)=>{
     choiceOne? setChoiceTwo(card): setChoiceOne(card)
          
    }

    useEffect(()=>{      
      if (choiceOne && choiceTwo) {       
        setdisabled(true)
        if (choiceOne.src===choiceTwo.src){
          setCards(prevCards=>{
            return prevCards.map(card=>{
              if (card.src===choiceOne.src){
                return {...card,matched:true}
              }else{
                return card
              }
            })
          })
          resetTurn()
        }
      else{
        setTimeout(()=>resetTurn(),1000)//wait a second and fire this function
      }        
    } 
    },[choiceOne,choiceTwo])

    const resetTurn=()=>{
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns=>prevTurns+1)
      setdisabled(false)
    }

  //To start game automatically
  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid"> 
        {cards.map(card=>(
            <SingleCard
              key={card.id} 
              card={card}
              handleChoice={handleChoice} 
              flipped={card===choiceOne || card===choiceTwo || card.matched}  
              disabled={disabled}         
            />
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>    
  );
}

export default App
