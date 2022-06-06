import React from "react";
import { Card, Button } from "react-bootstrap";

export default function StudyCard({deckLength, flipped, flipHandler, advanceCard, currCardNum, cardInfo}) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{`${currCardNum} of ${deckLength}`}</Card.Title>
                {!flipped && (
                    <Card.Text>
                        {cardInfo.front}
                    </Card.Text>
                )}
                {flipped && (
                    <Card.Text>
                        {cardInfo.back}
                    </Card.Text>
                )}
                <Button onClick={flipHandler}>Flip</Button>
                {flipped && (
                    <Button onClick={advanceCard}>Next Card</Button>
                )}
            </Card.Body>
        </Card>
    )
}
