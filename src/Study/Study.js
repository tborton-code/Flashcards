import React from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

export default function Study(){
    const { deckId } = useParams();
        const deck = readDeck(deckId).then(()=> deck)
        console.log(deck);
        // if (deck.cards.length>=3){
        //     return (
        //         <p>Study stuff goes here</p>
        //     )
        // } else {
        //     return (
        //         <div>
        //             <h1>{deck.name}: Study</h1>
        //             <h2>Not enough cards.</h2>
        //             <p>{`You need to have at least three cards to study. There are ${deck.cards.length} cards in this deck.`}</p>
        //         </div>
        //     )
        // }
        return (
            <h1>Die Bart, Die</h1>
        )


}