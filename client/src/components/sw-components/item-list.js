import React from 'react';
import ItemList from "../item-list";
import {withData, withSwapiService, withChildFunction, compose} from '../hoc-helpers';

const renderName = ({name}) => <span>{name}</span>;
const renderModelAndName = ({model, name}) => <span>{name} ({model})</span>;

const mapPersonMethodToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    }
};
const mapPlanetMethodToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    }
};
const mapStarshipMethodToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    }
};

const PersonList = compose(
    withSwapiService(mapPersonMethodToProps),
    withData,
    withChildFunction(renderName)
)(ItemList);

const PlanetList = compose(
    withSwapiService(mapPlanetMethodToProps),
    withData,
        withChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
    withSwapiService(mapStarshipMethodToProps),
    withData,
    withChildFunction(renderModelAndName)
)(ItemList);

export {
    PersonList,
    PlanetList,
    StarshipList
}