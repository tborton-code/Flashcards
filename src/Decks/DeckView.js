import React, {useEffect, useState, useCallback} from "react";
import { readDeck, deleteCard, deleteDeck } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";
import CardDetails from "../Cards/CardDetails";

export default function DeckView(){
    const { deckId } = useParams();
    const [deck, setDeck] = useState({ cards: []});
    const history = useHistory();

    const fetchDecks = useCallback(async () => {
        try {
          const data = await readDeck(deckId);
          setDeck(data);
        } catch (error) {
          console.log(error);
          setDeck({ name: "Not Found" });
        }
    }, [deckId]);

    useEffect(() => {
        fetchDecks();
    }, [deckId, fetchDecks]);

    async function handleDeleteCard(id) {
        if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
            await deleteCard(id);
            fetchDecks();
        }
    }

    async function handleDeleteDeck(id) {
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
            await deleteDeck(id);
            history.push("/");
        }
    }

    return (
    <div>
        <div className="breadcrumb">
            <Link to="/">🏠 Home</Link><p>&nbsp;/&nbsp;</p>
            <span className="breadcrumb-item active">Deck View</span>
        </div>
        <div>
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit Deck</Link>
            <Link to={`${deckId}/study`} className="btn btn-secondary">Study Deck</Link>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-secondary">Add Cards</Link>
            <button className="btn btn-danger" onClick={() => handleDeleteDeck(deckId)}>Delete Deck</button>
        </div>
        <div>
            <h1>Cards</h1>
        </div>
        <div>
            {deck.cards.map((card, index) => (
                <CardDetails
                    key={index}
                    id={card.id}
                    front={card.front}
                    back={card.back}
                    deckId={deckId}
                    handleDeleteCard={handleDeleteCard}
                />  
            ))}
        </div>
    </div>)
}