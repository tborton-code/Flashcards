import React, {useEffect, useState} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import DeckForm from "./DeckForm";

export default function EditDeck() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        const ac = new AbortController();

        async function fetchDeck() {
            try {
                const data = await readDeck(deckId, ac.signal);
                setDeck(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDeck();
        return () => ac.abort();
    }, [deckId]);

    function submitHandler(deck) {
        const ac = new AbortController();

        async function callUpdateDeck() {
            try {
                const updatedDeck = await updateDeck(deck, ac.signal);
                history.push(`/decks/${updatedDeck.id}`);
            } catch (error) {
                console.log(error);
            }
        }
        callUpdateDeck();
        return () => ac.abort();
    }

    function cancelHandler() {
        history.push(`/decks/${deckId}`);
    }
        


    return (
        <div>
            <div className="breadcrumb">
                <Link to="/">🏠 Home</Link><p>&nbsp;/&nbsp;</p>
                <Link to={`/decks/${deckId}`}>{deck.name}</Link><p>&nbsp;/&nbsp;</p>
                <span className="breadcrumb-item active">Edit Deck</span>
        </div>
            <h1>Edit Deck</h1>
            <DeckForm deck={deck} submitHandler={submitHandler} cancelHandler={cancelHandler} />
        </div>
    );
    }