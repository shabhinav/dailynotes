import React from "react";
import "./App.css";
import Navigation from "./Components/Navbar/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Body from "./Components/Body/Body";
import ViewAll from "./Components/ViewAll";
import Edit from "./Components/Edit";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Body} />
          <Route path="/viewAll" component={ViewAll} />
          <Route path="/edit/:id" component={Edit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
