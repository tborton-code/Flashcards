import React, { useEffect, useState } from "react";
import { readDeck, readCard, updateCard } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";
import CardForm from "./CardForm";

export default function EditCard(){
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});

    useEffect(()=> {
        const ac = new AbortController();

        async function fetchDeck(){
            try {
                const data = await readDeck((deckId), ac.signal);
                setDeck(data);
            } catch (error) {
                console.log(error);
            }
        }

        async function fetchCard(){
            try {
                const data = await readCard((cardId), ac.signal);
                setCard(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchDeck();
        fetchCard();
        return () => ac.abort();
}, [deckId, cardId]);

async function submitHandler(card) {
    try {
        await updateCard(card);
        history.push(`/decks/${deckId}`);
    } catch (error) {
        console.log(error);
    }
}

function cancelHandler() {
    history.push(`/decks/${deckId}`);
}

    return (
        <div>
            <div className="breadcrumb">
                <Link to="/">Home</Link><p>&nbsp;/&nbsp;</p>
                <Link to={`/decks/${deckId}`}>{deck.name}</Link><p>&nbsp;/&nbsp;</p>
                <span className="breadcrumb-item active">Edit Card</span>
            </div>
            <div>
                <h1>Edit Card</h1>
                <CardForm card={card} submitHandler={submitHandler} cancelHandler={cancelHandler} />
            </div>
        </div>
    );
};