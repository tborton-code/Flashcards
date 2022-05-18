import React from "react";
import { Link } from "react-router-dom";
import {Card, Button} from "react-bootstrap";


export default function DeckItem({deck, handleDeleteDeck}){
    return (
        <li>
            <Card>
                <Card.Body>
                    <Card.Title>{deck.name}</Card.Title>
                    <Card.Subtitle>{deck.cards.length} cards in deck</Card.Subtitle>
                    <Card.Text>{deck.description}</Card.Text>
                    <Link to={`/decks/${deck.id}`}><Button>View</Button></Link>
                    <Link to={`/decks/${deck.id}/study`}><Button>Study</Button></Link>
                    <Button onClick={handleDeleteDeck}>🗑️ Delete</Button>
                </Card.Body>
            </ Card>
        </li>
    )
}