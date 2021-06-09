import React, {createContext, useContext, useReducer} from 'react';
import {Action, Dispatch, ReactChildrenType} from "../../constants/globalTypes";

import {useToasts} from "react-toast-notifications";
import {
    GET_ALL_SPECIFICS,
    GET_ALL_SPECIFICS_BY_RESTAURANT_ID,
    GET_ALL_SPECIFICS_BY_RESTAURANT_ID_FAIL,
    GET_ALL_SPECIFICS_BY_RESTAURANT_ID_SUCCESS,
    GET_ALL_SPECIFICS_FAIL,
    GET_ALL_SPECIFICS_SUCCESS,
    GET_ALL_TYPES_BY_RESTAURANT_ID,
    GET_ALL_TYPES_BY_RESTAURANT_ID_FAIL,
    GET_ALL_TYPES_BY_RESTAURANT_ID_SUCCESS,
    GET_ALL_TYPES_RESTAURANT,
    GET_ALL_TYPES_RESTAURANT_FAIL,
    GET_ALL_TYPES_RESTAURANT_SUCCESS,
    GET_MENU_BY_RESTAURANT_ID,
    GET_MENU_BY_RESTAURANT_ID_FAIL,
    GET_MENU_BY_RESTAURANT_ID_SUCCESS,
    GET_RESTAURANT_BY_ID,
    GET_RESTAURANT_BY_ID_FAIL,
    GET_RESTAURANT_BY_ID_SUCCESS,
    GET_RESTAURANTS,
    GET_RESTAURANTS_FAIL,
    GET_RESTAURANTS_SUCCESS
} from "./RestaurantsActions";
import {
    CREATE_RESERVATION, CREATE_RESERVATION_FAIL,
    CREATE_RESERVATION_SUCCESS,
    GET_AVAILABLE_HOURS_SUCCESS_CLOSED
} from "../reservation/ReservationActions";

type State = {
    loading: boolean,
    error: any,
    restaurants: any[],
    selectedRestaurant: {
        restaurantDetails: any;
        listSpecifics: any[];
        listTypes: any[];
    },
    menu: any,
    listSpecifics: { id: string, name: string }[],
    listTypes: { id: string, name: string }[],
    fetchListSpecifics: SpecificRestaurant[],
    fetchListTypes: TypeRestaurant[],
}

export type SpecificRestaurant = { id: string, restaurantId: string, specificRestaurantId: string }
export type TypeRestaurant = { id: string, restaurantId: string, typeRestaurantId: string }
const RestaurantsStateContext = createContext<State | undefined>(undefined)
const RestaurantsDispatchContext = createContext<Dispatch | undefined>(undefined)

const initialState: State = {
    loading: true,
    error: {},
    menu: {},
    selectedRestaurant: {
        restaurantDetails: {},
        listSpecifics: [],
        listTypes: []
    },
    listSpecifics: [],
    listTypes: [],
    fetchListSpecifics: [],
    fetchListTypes: [],
    restaurants: []
}

const restaurantReducer = (state: State, action: Action) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {addToast} = useToasts();

    switch (action.type) {

        case GET_RESTAURANT_BY_ID: {
            return {
                ...state,
                selectedRestaurant: {},
                loading: true
            }
        }
        case GET_RESTAURANT_BY_ID_SUCCESS: {
            return {
                ...state,
                selectedRestaurant: action.payload,
                loading: false,
            }
        }
        case GET_RESTAURANT_BY_ID_FAIL: {
            return {
                ...state,
                selectedRestaurant: {},
                error: action.payload.error,
                loading: false
            }
        }
        case GET_RESTAURANTS: {
            return {
                ...state,
                loading: true,
                error: ""
            }
        }
        case GET_RESTAURANTS_FAIL: {
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        }
        case GET_RESTAURANTS_SUCCESS: {
            return {
                ...state,
                restaurants: action.payload,
                loading: false,
            }
        }
        case GET_ALL_TYPES_BY_RESTAURANT_ID_FAIL: {
            addToast(action.payload.error, {appearance: 'error'});
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case GET_ALL_TYPES_BY_RESTAURANT_ID_SUCCESS: {
            addToast('Get types restaurant successfully', {appearance: 'info'});
            return {
                ...state,
                fetchListTypes: action.payload,
                loading: false,
                error: ""
            }
        }
        case GET_ALL_TYPES_BY_RESTAURANT_ID: {
            return {
                ...state,
                loading: true,
                error: ""
            }
        }
        case GET_ALL_SPECIFICS_BY_RESTAURANT_ID_FAIL: {
            addToast(action.payload.error, {appearance: 'error'});
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            }
        }
        case GET_ALL_SPECIFICS_BY_RESTAURANT_ID_SUCCESS: {
            addToast('Get specifics restaurant successfully', {appearance: 'info'});
            return {
                ...state,
                fetchListSpecifics: action.payload,
                error: "",
                loading: false
            }
        }
        case GET_ALL_SPECIFICS_BY_RESTAURANT_ID: {
            return {
                ...state,
                loading: true,
                fetchListSpecifics: [],
                error: "",
            }
        }
        case GET_ALL_TYPES_RESTAURANT: {
            return {
                ...state,
                error: "",
                loading: true
            }
        }
        case GET_ALL_TYPES_RESTAURANT_SUCCESS: {
            return {
                ...state,
                listTypes: action.payload,
                loading: false,
                error: ""
            }
        }
        case GET_ALL_TYPES_RESTAURANT_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case GET_ALL_SPECIFICS: {
            return {
                ...state,
                error: "",
                loading: true
            }
        }
        case GET_ALL_SPECIFICS_SUCCESS: {
            return {
                ...state,
                listSpecifics: action.payload,
                loading: false,
                error: ""
            }
        }
        case GET_ALL_SPECIFICS_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case GET_AVAILABLE_HOURS_SUCCESS_CLOSED:{
            return {
                ...state,
                loading: false,
                error:"Close day"
            }
        }

        case GET_MENU_BY_RESTAURANT_ID: {
            return {
                ...state,
                menu: {},
                loading: true,
                error: ""
            }
        }
        case GET_MENU_BY_RESTAURANT_ID_SUCCESS: {
            addToast('Get menu successfully', {appearance: 'info'});
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: ""
            }
        }
        case GET_MENU_BY_RESTAURANT_ID_FAIL: {
            if (action.payload.error == "mongo: no documents in result") {
                addToast("No menu found", {appearance: 'warning'});
            } else {
                addToast(action.payload.error, {appearance: 'error'});

            }

            return {
                ...state,
                loading: false,
                menu: [],
                error: action.payload.error
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}

const RestaurantsProvider = ({children}: ReactChildrenType) => {
    const [state, dispatch] = useReducer(restaurantReducer, initialState)
    return (
        <RestaurantsStateContext.Provider value={state}>
            <RestaurantsDispatchContext.Provider value={dispatch}>
                {children}
            </RestaurantsDispatchContext.Provider>
        </RestaurantsStateContext.Provider>
    )
}

const useRestaurantsState = () => {
    const context = useContext(RestaurantsStateContext);
    if (context === undefined) {
        throw new Error("useRestaurantsState must be used within a RestaurantsProvider")
    }
    return context;
}

const useRestaurantsDispatch = () => {
    const context = useContext(RestaurantsDispatchContext);

    if (context === undefined) {
        throw new Error("useSettingsState must be used within a SettingsProvider")
    }
    return context;
}

export {RestaurantsProvider, useRestaurantsDispatch, useRestaurantsState}