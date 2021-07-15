import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import Posts from "./pages/Posts";
import SignIn from "./pages/SignIn";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navigation />
        </div>
        <Container>
          <Switch>
            <Route exact path="/" component={Posts}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
