import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard";


export default function StudyDeck(){
    const { deckId } = useParams();
    const [currDeck, setCurrDeck] = useState({});
    const [deckLength, setDeckLength] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [cardInfo, setCardInfo] = useState({});
    const [currCardNum, setCurrCardNum] = useState(1);
    const [index, setIndex] = useState(0);
    const history = useHistory();


    function flipHandler(){
        setFlipped(!flipped);
    };

    function advanceCard(){
        // advance currCardNum by 1
        setCurrCardNum(currCardNum+1);
        // reset flipped to false
        setFlipped(false);
        // conditional irt end of deck or not
        if (currCardNum !== deckLength){
            // if not, update the index to the next card
            setIndex(index+1);
            setCardInfo(currDeck.cards[index]);
        } else {
            const response = window.confirm("Restart cards? \n\n Click 'Cancel' to return to the home page.")
            console.log(response);
            if (!response){history.push("/")}
            else {setFlipped(false); 
                setCurrCardNum(1);
                setIndex(0); 
                setCardInfo(currDeck.cards[0]);}
        }
        
    }

    
    useEffect(()=> {

        async function fetchDeck(){
            const data = await readDeck(deckId)
            setCurrDeck(data);
            setDeckLength(data.cards.length);
            setCardInfo(data.cards[0])
        }
        fetchDeck();

    },[deckId]);

    return (
        <div>
        <div className="breadcrumb">
            <Link to="/">🏠 Home</Link><p>&nbsp;/&nbsp;</p>
            <Link to={`/decks/${deckId}`}>{`${currDeck.name}`}</Link><p>&nbsp;/&nbsp;</p>
            <span className="breadcrumb-item active">Study</span>
        </div>
        <h1>Study: {currDeck.name}</h1>

            {deckLength>=3 && 
                (
                    <StudyCard 
                    deckLength={deckLength}
                    flipped={flipped}
                    flipHandler={flipHandler}
                    advanceCard={advanceCard}
                    currCardNum={currCardNum}
                    cardInfo={cardInfo}
                    />
                )}
                {(deckLength<3 || !deckLength) &&
                    (
                        <div>
                            <h2>Not enough cards.</h2>
                            <p>{`You need to have at least three cards to study. There are ${deckLength} cards in this deck.`}</p>
                            <Link to="/decks/:deckId/cards/new" className="btn btn-primary">➕ Add Cards</Link>
                        </div>
                    )
                }
        </div>
    )
}