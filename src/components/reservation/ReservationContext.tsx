import React, {createContext, useContext, useReducer} from 'react';
import {Action, Dispatch, ReactChildrenType} from "../../constants/globalTypes";
import {
    CREATE_RESERVATION,
    CREATE_RESERVATION_FAIL,
    CREATE_RESERVATION_SUCCESS,
    GET_AVAILABLE_HOURS,
    GET_AVAILABLE_HOURS_FAIL,
    GET_AVAILABLE_HOURS_SUCCESS,
    GET_AVAILABLE_HOURS_SUCCESS_CLOSED,
    GET_RESERVATION,
    GET_RESERVATION_FAIL,
    GET_RESERVATION_SUCCESS,
    getReservation, UPDATE_ASSISTANCE_RESERVATION_SUCCESS
} from "./ReservationActions";
import {useToasts} from "react-toast-notifications";
import {API_WS_BOOKING} from "../../constants/globalConstants";
import {string} from "yup";

type State = {
    loading: boolean,
    error: any,
    listAvailableReservation: { timeString: string, dateTime: string }[],
    selectedReservation: Reservation,
    recreateConnection: boolean,

}

export type Reservation = {
    id: string,
    persons: number,
    startReservationDate: string,
    endReservationDate: string,
    restaurantId: string,
    phone: string,
    firstName: string,
    lastName: string,
    email: string,
    details: string,
    status: string,
    tableId: string[],
    messageToClient: string,
    code: string,
    products: any[],
    totalToPay: number,
    needAssistance:boolean,
}

const ReservationStateContext = createContext<State | undefined>(undefined)
const ReservationDispatchContext = createContext<Dispatch | undefined>(undefined)

const initialState: State = {
    recreateConnection: true,
    loading: false,
    error: "",
    listAvailableReservation: [],
    selectedReservation: {
        needAssistance:false,
        endReservationDate: "",
        startReservationDate: "",
        code: "",
        details: "",
        email: "",
        id: "",
        firstName: "",
        lastName: "",
        messageToClient: "",
        status: "",
        persons: 0,
        phone: "",
        tableId: [],
        restaurantId: "",
        totalToPay: 0,
        products: []
    },
}

export const RECREATE_CONNECTION = "recreate_connection";
export const SUCCESS_RECREATE_CONNECTION = "success_recreate";

export const setupWebSocket = (channel: string, dispatch: Dispatch) => {
    let socket = new WebSocket(`${API_WS_BOOKING}/${channel}`, ["Upgrade"]);
    socket.onopen = () => {
        dispatch({type: SUCCESS_RECREATE_CONNECTION, payload: {}})
        console.log("Successfully Connected");
    };


    socket.onclose = (event: any) => {
        console.log("Socket Closed Connection: ", event);
        socket.close();
        dispatch({type: RECREATE_CONNECTION, payload: {}})
    };

    socket.onerror = (error: any) => {
        console.log("Socket Error: ", error);
    };

    socket.onmessage = (e: { data: string; }) => {
        let json = JSON.parse(e.data)
        console.log(json)
        switch (json.type) {
            case UPDATE_BOOKING: {
                dispatch({type: UPDATE_BOOKING, payload: {dispatch: dispatch, id: json.id}})
            }
        }
    }

    return socket;
}

export const UPDATE_BOOKING = "update_booking";


const reservationReducer = (state: State, action: Action) => {
// eslint-disable-next-line react-hooks/rules-of-hooks
    const {addToast} = useToasts();

    switch (action.type) {
        case UPDATE_ASSISTANCE_RESERVATION_SUCCESS:{
            addToast("Succes send need assistance",{appearance: 'success'})
            return {
                ...state,
            }
        }
        case UPDATE_BOOKING: {
            getReservation({
                dispatch: action.payload.dispatch,
                restaurantId: state.selectedReservation.restaurantId,
                email: state.selectedReservation.email,
                code: state.selectedReservation.code
            })
            return {
                ...state
            }
        }
        case SUCCESS_RECREATE_CONNECTION: {
            return {
                ...state,
                recreateConnection: false,
            }
        }
        case RECREATE_CONNECTION: {
            return {
                ...state,
                recreateConnection: true,
            }
        }
        case GET_RESERVATION: {
            return {
                ...state,
                error: "",
                selectedReservation: {},
                loading: true,
            }
        }
        case GET_RESERVATION_SUCCESS: {
            addToast('Get reservation successfully', {appearance: 'info'});
            return {
                ...state,
                error: "",
                selectedReservation: action.payload,
                loading: false,
            }
        }
        case GET_RESERVATION_FAIL: {
            addToast(action.payload.error, {appearance: 'error'});
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            }
        }
        case CREATE_RESERVATION: {
            return {
                ...state,
                loading: true,
                error: ""
            }
        }
        case CREATE_RESERVATION_SUCCESS: {
            addToast('Reservation was created', {appearance: 'success'});
            return {
                ...state,
                loading: false,
                error: ""
            }
        }
        case CREATE_RESERVATION_FAIL: {
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