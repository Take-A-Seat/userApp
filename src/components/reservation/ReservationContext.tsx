import React, {createContext, useContext, useReducer} from 'react';
import {Action, Dispatch, ReactChildrenType} from "../../constants/globalTypes";
import {
    CREATE_RESERVATION, CREATE_RESERVATION_FAIL, CREATE_RESERVATION_SUCCESS,
    GET_AVAILABLE_HOURS,
    GET_AVAILABLE_HOURS_FAIL,
    GET_AVAILABLE_HOURS_SUCCESS,
    GET_AVAILABLE_HOURS_SUCCESS_CLOSED
} from "./ReservationActions";
import {useToasts} from "react-toast-notifications";

type State = {
    loading: boolean,
    error: any,
    listAvailableReservation: { timeString: string, dateTime: string }[]
}

const ReservationStateContext = createContext<State | undefined>(undefined)
const ReservationDispatchContext = createContext<Dispatch | undefined>(undefined)

const initialState: State = {
    loading: false,
    error: "",
    listAvailableReservation: []
}


const reservationReducer = (state: State, action: Action) => {
// eslint-disable-next-line react-hooks/rules-of-hooks
    const {addToast} = useToasts();

    switch (action.type) {
        case CREATE_RESERVATION:{
            return {
                ...state,
                loading: true,
                error:""
            }
        }
        case CREATE_RESERVATION_SUCCESS:{
            addToast('Reservation was created', {appearance: 'success'});
            return {
                ...state,
                loading: false,
                error: ""
            }
        }
        case CREATE_RESERVATION_FAIL:{
            addToast(action.payload.error, {appearance: 'error'});
            return {
                ...state,
                error: action.payload.error
            }
        }
        case GET_AVAILABLE_HOURS: {
            return {
                ...state,
                loading: true,
                listAvailableReservation: [],
                error: ""
            }
        }

        case GET_AVAILABLE_HOURS_SUCCESS_CLOSED: {
            return {
                ...state,
                loading: false,
                listAvailableReservation: [],
                error: "Closed restaurant"
            }
        }

        case GET_AVAILABLE_HOURS_SUCCESS: {
            return {
                ...state,
                loading: false,
                listAvailableReservation: action.payload,
                error: ""
            }
        }

        case GET_AVAILABLE_HOURS_FAIL: {
            return {
                ...state,
                loading: false,
                listAvailableReservation: [],
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

const ReservationProvider = ({children}: ReactChildrenType) => {
    const [state, dispatch] = useReducer(reservationReducer, initialState)
    return (
        <ReservationStateContext.Provider value={state}>
            <ReservationDispatchContext.Provider value={dispatch}>
                {children}
            </ReservationDispatchContext.Provider>
        </ReservationStateContext.Provider>
    )
}

const useReservationState = () => {
    const context = useContext(ReservationStateContext);
    if (context === undefined) {
        throw new Error("useReservationState must be used within a  ReservationStateContext")
    }
    return context;
}

const useReservationDispatch = () => {
    const context = useContext(ReservationDispatchContext);

    if (context === undefined) {
        throw new Error("useReservationDispatch must be used within a ReservationDispatchContext")
    }
    return context;
}

export {ReservationProvider, useReservationState, useReservationDispatch}