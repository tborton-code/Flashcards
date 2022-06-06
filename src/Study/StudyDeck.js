import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import { Breadcrumb } from "react-bootstrap";
import StudyCard from "./StudyCard";


export default function StudyDeck(){
    const { deckId } = useParams();
    const [currDeck, setCurrDeck] = useState({});
    const [deckLength, setDeckLength] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [cardInfo, setCardInfo] = useState({});
    const [currCardNum, setCurrCardNum] = useState(1);
    const [index, setIndex] = useState(0);


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
            if (!response){History.push("/")}
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
        <>
        <Breadcrumb>
            <Breadcrumb.Item><Link to="/">🏠 Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to={`/decks/${deckId}`}>{`${currDeck.name}`}</Link></Breadcrumb.Item>
            <Breadcrumb.Item active>Study</Breadcrumb.Item>
        </Breadcrumb>
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
                {deckLength<3 &&
                    (
                        <div>
                            <h1>{currDeck.name}: Study</h1>
                            <h2>Not enough cards.</h2>
                            <p>{`You need to have at least three cards to study. There are ${deckLength} cards in this deck.`}</p>
                        </div>
                    )
                }
        </>
    )
}