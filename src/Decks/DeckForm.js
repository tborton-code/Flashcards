import React, {useEffect, useState} from "react";
import { Button, Form } from "react-bootstrap";


export default function DeckForm({deck, submitHandler}){
    const [deckInfo, setDeckInfo] = useState(deck)

    useEffect(()=>{
        setDeckInfo(deck);
    }, [deck])

    const updateForm = (event)=>{
        const {value, name} = event.target;
        setDeckInfo({...deckInfo, [name]:value})
    }

    const submit = (event)=>{
        event.preventDefault();
        submitHandler(deckInfo)
    }

    return (
    <Form onSubmit={submit}>
        <Form.Group controlId="formDeckName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" 
            placeholder="Deck Name" 
            value={deckInfo?.name || ""} 
            name="name"
            onChange={updateForm}/>
        </Form.Group>
        <Form.Group controlId="formDeckDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="description" 
            placeholder="Enter a brief description of the deck" 
            value={deckInfo?.description || ""} 
            name="description"
            onChange={updateForm}/>
        </Form.Group>
        <Button type="submit" >
            Cancel
        </Button>
        <Button type="submit" >
            Submit
        </Button>
    </Form>)
}