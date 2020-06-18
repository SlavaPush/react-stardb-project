import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import {PlanetPage, PeoplePage, StarshipsPage, SecretPage, LoginPage} from "../pages";

import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context";

import './app.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import StarshipDetails from "../sw-components/starship-details";

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    };


    render() {

        const {isLoggedIn} = this.state;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header/>

                            <RandomPlanet/>

                            <Switch>
                                <Route path="/"
                                      render={() => <h2>Welcome to StarDB</h2>}
                                      exact/>
                                {/*<Route path="/people" exact render={() => <h2>People</h2>}/>*/}
                                <Route path="/people/:id?" component={PeoplePage}/>
                                <Route path="/planets" component={PlanetPage}/>
                                <Route path="/starships" exact component={StarshipsPage}/>
                                <Route path="/starships/:id"
                                      render={({match}) => {
                                          const {id} = match.params;
                                          return <StarshipDetails itemId={id}/>
                                      }}
                                />
                                <Route
                                    path="/login"
                                    render={() => (
                                        <LoginPage isLoggedIn={isLoggedIn}
                                                  onLogin={this.onLogin}/>
                                    )}/>
                                <Route  
                                    path="/secret"
                                    render={() => (
                                        <SecretPage isLoggedIn={isLoggedIn}/>
                                    )}/>
                                <Route render={() => <h2>Page not found</h2>} />
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
