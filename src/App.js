import React, { Component } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';

class App extends Component {
    render() {
        return (
            <Router basename="/">
                <div id="wrapper">
                    <NavBar/>
                    <div id="page-wrapper">
                        <div className="container-fluid">
                            <BaseRouter/>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
