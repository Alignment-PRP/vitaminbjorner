import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root.jsx';
import Home from './Home.jsx';
import Projects from './projects/Projects.jsx';
import NewProject from './projects/NewProject.jsx';
import {Router, Route, browserHistory} from "react-router";

class App extends React.Component {

    render() {
        return (
            <Router history={browserHistory}>
                <Route path={"/"} component={Root}>
                    <Route path={"login"} component={Home}/>
                    <Route path={"projects"} component={Projects}/>
                    <Route path={"newproject"} component={NewProject}/>
                </Route>
            </Router>
        );
    }

    }

ReactDOM.render(
    React.createElement(App, null),
    window.document.getElementById("app")
);