import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom"
import {listDecks} from "../utils/api";
import DeckItem from "../Decks/DeckItem";
import { deleteDeck } from "../utils/api";



export default function Home() {
    const [decks, setDecks] = useState([]);

    useEffect(()=> {
        const ac = new AbortController();

        async function fetchDecks() {
            try{
            const data = await listDecks(ac.signal);
            setDecks(data);
            } catch(error){
                console.log(error)
            }
        }
        fetchDecks();

        return () => ac.abort();

    }, []);

    async function handleDeleteDeck (id){
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
        ){
            await deleteDeck(id);
            setDecks(()=> decks.filter((deck)=> deck.id !== id))
        }
    }

return (
    <div>
        <div>
            <Link to="/decks/new" className="btn btn-secondary">➕ Create Deck</Link>
        </div>
        <div>
            <ul style={{"listStyleType":"none"}}>
                {decks.map(deck =>
                    <DeckItem deck={deck} handleDeleteDeck={handleDeleteDeck}/>)}
            </ul>
        </div>
    </div>
)
}