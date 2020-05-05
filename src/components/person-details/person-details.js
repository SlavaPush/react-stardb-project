import React, {Component} from 'react';

import Spinner from "../spinner";

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import ErrorIndicator from "../error-indicator";

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: false,
        error: false
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.setState({
                loading: this.props.personLoading
            });

            this.updatePerson();
        }
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    };

    updatePerson() {
        const {personId} = this.props;
        if (!personId) {
            return;
        }
        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({
                    person,
                    loading: false
                });
            })
            .catch(this.onError);

    }

    render() {
        if (!this.state.person) {
            return (
                <SelectView />
            )
        }
        const {person, loading, error} = this.state;

        const hasData = !(loading || error);


        const spinner = loading ? <Spinner /> : null;
        const erroMessage = error ? <ErrorIndicator /> : null;
        const content = hasData ? <PersonView person={person}/> : null;

        return (
            <div className="person-details card">
                {spinner}
                {content}
                {erroMessage}
            </div>
        )
    }
}

const PersonView = ({person}) => {
    const {id, name, gender, birthYear, eyeColor} = person;

    return (
        <React.Fragment>
            <img className="person-image"
                 src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg `} alt="img"/>

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender:</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year:</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color:</span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )

}

const SelectView = () => {

    return (
        <React.Fragment>
            <div className="person-details card">
                <span>Select a person from a list</span>
            </div>
        </React.Fragment>

    )
}