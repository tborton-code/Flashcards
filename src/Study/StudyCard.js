import React from "react";

export default function StudyCard({deckLength, flipped, flipHandler, advanceCard, currCardNum, cardInfo}) {
    return (
        <div className="card">
                <h3 className="card-title">{`Card ${currCardNum} of ${deckLength}`}</h3>
                {!flipped && (
                    <p className="card-text">
                        {cardInfo.front}
                    </p>
                )}
                {flipped && (
                    <p className="card-text">
                        {cardInfo.back}
                    </p>
                )}
                <button className="btn btn-secondary" onClick={flipHandler}>Flip</button>
                {flipped && (
                    <button className="btn btn-primary" onClick={advanceCard}>Next Card</button>
                )}
        </div>
    )
}
