import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

export default function AddCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const history = useHistory();

    useEffect(() => {
        const ac = new AbortController();

        async function fetchDeck() {
            try{
            const data = await readDeck(deckId, ac.signal);
            setDeck(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDeck();

        return () => ac.abort();
    }, [deckId]);

    async function submitHandler(card) {
        try {
            await createCard(deckId, card);
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
                <Link to="/">🏠 Home</Link><p>&nbsp;/&nbsp;</p>
                <Link to={`/decks/${deckId}`}>{deck.name}</Link><p>&nbsp;/&nbsp;</p>
                <span className="breadcrumb-item active">Add Card</span>
            </div>
            <div>
                <h1>{deck.name}: Add Card</h1>
            </div>
            <CardForm submitHandler={submitHandler} cancelHandler={cancelHandler} />
        </div>
    );
}