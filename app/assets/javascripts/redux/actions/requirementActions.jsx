import axios from 'axios';
import * as URLS from './../../config.jsx';
import {GET_ALL_REQUIREMENTS,
        GET_ALL_CATEGORY_NAMES,
        UPDATE_FILTER_REQUIREMENT_LIST,
        UPDATE_FILTER,
        UPDATE_REQUIREMENT,
        DELETE_REQUIREMENT,
        ADD_TO_FILTER,
        REMOVE_FROM_FILTER
} from './../types.jsx';

export function getAllRequirements() {
    return dispatch => {
        axios.get(URLS.REQUIREMENTS_GET)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getAllRequirementsAsync(data))
            });
    }
}

function getAllRequirementsAsync(data) {
    return {
        type: GET_ALL_REQUIREMENTS,
        payload: data
    }
}

export function getAllCategoryNames() {
    return dispatch => {
        axios.get(URLS.CATEGORY_GET_ALL_NAMES)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getAllCategoryNamesAsync(data))
            });

    }

}

function getAllCategoryNamesAsync(data) {
    return {
        type: GET_ALL_CATEGORY_NAMES,
        payload: data
    }
}

export function updateFilterRequirementList() {
    return {
        type: UPDATE_FILTER_REQUIREMENT_LIST
    }
}

export function updateFilter(newFilter) {
    return {
        type: UPDATE_FILTER,
        payload: newFilter
    }
}

export function addToFilter(category) {
    return {
        type: ADD_TO_FILTER,
        payload: category
    }
}

export function removeFromFilter(category) {
    return {
        type: REMOVE_FROM_FILTER,
        payload: category
    }
}

export function updateRequirement(requirement) {
    return {
        type: UPDATE_REQUIREMENT,
        payload: requirement
    }
}

export function deleteRequirement(id){

    //Create JSON
    const post = {
        RID: id
    };

    return dispatch => {
        axios.post(URLS.REQUIREMENT_POST_DELETE, post)
            .then(function (response) {
                dispatch(getAllRequirements());
            })
            .catch(function (error) {
                console.log(error);
            });
        dispatch(deleteRequirementAsync())
    }
}

function deleteRequirementAsync(){
    return{
        type: DELETE_REQUIREMENT
    }
}
