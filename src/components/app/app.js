import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from "../people-page";
import ErrorIndicator from "../error-indicator";

import './app.css';
import ItemList from "../item-list";
import PersonDetails from "../person-details";

export default class App extends Component {

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    componentDidCatch(error, info) {

        this.setState({
            hasError: true
        });
    }

    toggleRandomPlanet = () => {
        this.setState({
            showRandomPlanet: !this.state.showRandomPlanet
        });
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        return (
            <div>
                <Header />

                {planet}

                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>
                <PeoplePage />
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson} personLoading={ true }/>
                    </div>
                </div>
            </div>
        );
    }
}
