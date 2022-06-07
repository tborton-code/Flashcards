import React from "react";
import { Link } from "react-router-dom";

export default function CardDetails({ id, front, back, handleDeleteCard, deckId }) {
  return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{front}</h5>
            <p className="card-text">{back}</p>
            <Link to={`/decks/${deckId}/cards/${id}/edit`} className="btn btn-secondary">
              Edit
            </Link>
            <button className="btn btn-danger" onClick={() => handleDeleteCard(id)}>Delete Card</button>
        </div>
    </div>
  );
}