import React from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import DeckForm from "./DeckForm";


export default function NewDeck(){
    const history = useHistory();
    function submitHandler(deck){
        async function callCreateDeck(){
            const createdDeck = await createDeck(deck);
            history.push(`/decks/${createdDeck.id}`)
        }
        callCreateDeck();
    }
    return (
        <div>
        <div className="breadcrumb">
            <Link to="/">🏠 Home</Link><p>&nbsp;/&nbsp;</p>
            <span className="breadcrumb-item active">Create Deck</span>
        </div>
        <h1>Create Deck</h1>
        <DeckForm submitHandler={submitHandler}/>
        </div>
    )
    
    
}