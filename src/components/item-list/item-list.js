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

    renderItems(arr) {
        return arr.map(({id, name}) => {
            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}>
                    {name}
                </li>
            )
        });
    }

    onError = (err) => {
        this.setState({
            error: true,
        })
    };


    render() {

        const { peopleList, error } = this.state;

        if (!peopleList) {
            return <Spinner />;
        }

        const items = this.renderItems(peopleList);

        const content = error ? <ErrorIndicator/> : items;

        return (
            <ul className="item-list list-group">
                {content}
            </ul>
        );
    }
}