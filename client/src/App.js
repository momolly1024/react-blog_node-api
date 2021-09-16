import React, { useContext } from "react";
import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Context } from "./context/Context";

function App() {
    const { user } = useContext(Context);
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <TopBar />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/register">{user ? <Home /> : <Register />}</Route>
                <Route path="/login">{user ? <Home /> : <Login />}</Route>
                <Route path="/write">{user ? <Write /> : <Register />}</Route>
                <Route path="/settings">
                    {user ? <Settings /> : <Register />}
                </Route>
                <Route path="/post/:postId">
                    <Single />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
