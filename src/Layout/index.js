import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import StudyDeck from "../Study/StudyDeck";
import NewDeck from "../Decks/NewDeck";
import DeckView from "../Decks/DeckView";
import EditDeck from "../Decks/EditDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";



function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch >
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route path="/decks/new">
            <NewDeck />
          </Route>
          <Route exact={true} path={"/decks/:deckId"}>
            <DeckView />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
