import React from "react";
import { Breadcrumb } from "react-bootstrap";
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
        <>
        <Breadcrumb>
            <Breadcrumb.Item><Link to="/">🏠 Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item active>Create Deck</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Create Deck</h1>
        <DeckForm submitHandler={submitHandler}/>
        </>
    )
    
    
}