import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import StudyDeck from "../Study/StudyDeck"
import NewDeck from "../Decks/NewDeck"


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
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
          {/*<Route path="/decks/:deckId">
          
          </Route>*/}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
