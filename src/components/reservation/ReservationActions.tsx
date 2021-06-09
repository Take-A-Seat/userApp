import React from "react";
import {Dispatch} from "../../constants/globalTypes";
import {authFetch} from "../../helpers/createAuthProvider";


export const GET_AVAILABLE_HOURS = "get_available_hours";
export const GET_AVAILABLE_HOURS_SUCCESS = "get_available_hours_success";
export const GET_AVAILABLE_HOURS_SUCCESS_CLOSED = "get_available_hours_success_closed";
export const GET_AVAILABLE_HOURS_FAIL = "get_available_hours_fail";

export const getAvailableFreeHours = ({
                                          dispatch,
                                          date,
                                          persons,
                                          restaurantId
                                      }: { dispatch: Dispatch, date: string, persons: number, restaurantId: string }) => {
    dispatch({type: GET_AVAILABLE_HOURS, payload: {}})
    authFetch(`/bookings/restaurant/${restaurantId}/booking-hours/date/${date}/persons/${persons}`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_AVAILABLE_HOURS_FAIL, payload: JSON.parse(error)})
            })
        }
        if (response.status == 204) {
            return dispatch({type: GET_AVAILABLE_HOURS_SUCCESS_CLOSED, payload: {}})
        }
        return response.json()
    }).then(data => {
        if (data) {
            return dispatch({type: GET_AVAILABLE_HOURS_SUCCESS, payload: data})
        }

    }).catch(error => {
        console.log("error", error)
    })
}

export const CREATE_RESERVATION = "create_reservation";
export const CREATE_RESERVATION_SUCCESS = "create_reservation_success";
export const CREATE_RESERVATION_FAIL = "create_reservation_fail";


export const createReservation = ({
                                         dispatch,
                                         restaurantId,
                                         values,
                                         callBack,
                                     }: { dispatch: Dispatch, restaurantId: string, values: any, callBack: () => void }) => {
    dispatch({type: CREATE_RESERVATION, payload: {}});
    authFetch(`/bookings/restaurant/${restaurantId}/booking`, {
        method: "POST",
        body: JSON.stringify(values)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: CREATE_RESERVATION_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: CREATE_RESERVATION_SUCCESS, payload: data})
        if (callBack) {
            callBack()
        }
    }).catch(error => {
        console.log("error", error)
    })
}