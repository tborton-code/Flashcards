import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

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
    <div>
        <form onSubmit={submit}>
            <div className="form-group mb-3">
                <label>Name</label>
                <input type="text"
                className="form-control" 
                placeholder="Deck Name" 
                value={deckInfo?.name || ""} 
                name="name"
                onChange={updateForm}/>
            </div>
            <div className="form-group mb-3">
                <label>Description</label>
                <textarea as="textarea" 
                className="form-control"
                rows="3" 
                placeholder="Enter a brief description of the deck" 
                value={deckInfo?.description || ""} 
                name="description"
                onChange={updateForm}/>
            </div>
            <Link to="/" className="btn btn-secondary">
                Cancel
            </Link>
            <button className="btn btn-primary" type="submit" >
                Submit
            </button>
        </form>
    </div>)
}