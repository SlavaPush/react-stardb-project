import React, { Component } from 'react';

import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

import SwapiService from "../../services/swapi-service";

import './item-list.css';


export default class ItemList extends Component {

    swapiService = new SwapiService();

    state = {
        peopleList: null,
        error: false
    }

    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then((peopleList) => {
                this.setState({
                    peopleList
                });
            })
            .catch(this.onError);
    }

    onError = (err) => {
        this.setState({
            error: true,
        })
    };


    render() {

        const { peopleList, error } = this.state;

        const hasData = !(peopleList || error);

        const spinner = hasData ? <Spinner /> : null;
        const erroMessage = error ? <ErrorIndicator/> : null;
        const content = peopleList ? <PeopleView peopleList={ peopleList } onItemSelected={this.props.onItemSelected} /> : null;

        return (
            <ul className="item-list list-group">
                {erroMessage}
                {content}
                {spinner}
            </ul>
        );
    }
}

const PeopleView = ({onItemSelected, peopleList}) => {

    const items = peopleList.map((person) => {
        return (
            <li className="list-group-item"
                key={person.id}
                onClick={() => onItemSelected(person.id)}>
                {person.name}
            </li>
        )
    });
    return (
        < React.Fragment>
            {items}
        </ React.Fragment>
    );
};