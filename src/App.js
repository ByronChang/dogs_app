import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";
import { history } from "./helpers/history";
import * as Actions from "./actions";
import CoverAlbum from "./components/CoverAlbum";

const App = () => {  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.getAllBreeds());
    // eslint-disable-next-line
  }, []);
  
  return (
    <Router history={history}>
      <div> 
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">Dog´s Album</span>
      </nav>
        <div>         
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path={["/album"]} component={CoverAlbum} />
            <Route exact path={["/album/:breed"]} component={CoverAlbum} />
            <Route exact path={["/album/:breed/:subbreed"]} component={CoverAlbum} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
