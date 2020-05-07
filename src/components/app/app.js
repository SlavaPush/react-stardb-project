import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import {PlanetPage, PeoplePage, StarshipPage} from "../pages";

import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context";

import './app.css';

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        personSelected: null,
        planetSelected: null,
        starshipSelected: null
    };


    render() {

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                    <div className="stardb-app">
                        <Header/>

                        <RandomPlanet />

                        <PeoplePage/>
                        <PlanetPage />
                        <StarshipPage/>

                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}