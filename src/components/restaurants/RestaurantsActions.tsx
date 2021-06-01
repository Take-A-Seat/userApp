import {Dispatch} from "../../constants/globalTypes";
import {authFetch} from "../../helpers/createAuthProvider";


export const GET_RESTAURANTS = "get_restaurants";
export const GET_RESTAURANTS_SUCCESS = "get_restaurants_success";
export const GET_RESTAURANTS_FAIL = "get_restaurants_fail";
export const getAllRestaurants = ({dispatch}: { dispatch: Dispatch }) => {
    dispatch({
        type: GET_RESTAURANTS,
        payload: []
    });

    authFetch(`/restaurants/`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_RESTAURANTS_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: GET_RESTAURANTS_SUCCESS, payload: data})
    }).catch(error => {
        console.log("err", error)
    })
}


export const GET_ALL_SPECIFICS = "get_all_specifics";
export const GET_ALL_SPECIFICS_SUCCESS = "get_all_specifics_success";
export const GET_ALL_SPECIFICS_FAIL = "get_all_specifics_fail";
export const getAllSpecifics = ({dispatch}: { dispatch: Dispatch }) => {
    dispatch({
        type: GET_ALL_SPECIFICS,
        payload: []
    });

    authFetch(`/restaurants/specificsRestaurant`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_ALL_SPECIFICS_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: GET_ALL_SPECIFICS_SUCCESS, payload: data})
        }
    }).catch(error => {
        console.log("err", error)
    })
}

export const GET_ALL_TYPES_RESTAURANT = "get_all_types_restaurant";
export const GET_ALL_TYPES_RESTAURANT_SUCCESS = "get_all_types_restaurant_success";
export const GET_ALL_TYPES_RESTAURANT_FAIL = "get_all_types_restaurant_fail";
export const getAllTypesRestaurant = ({dispatch}: { dispatch: Dispatch }) => {
    dispatch({
        type: GET_ALL_TYPES_RESTAURANT,
        payload: []
    });

    authFetch(`/restaurants/typesRestaurant`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_ALL_TYPES_RESTAURANT_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: GET_ALL_TYPES_RESTAURANT_SUCCESS, payload: data})
        }
    }).catch(error => {
        console.log("err", error)
    })
}

export const GET_ALL_TYPES_BY_RESTAURANT_ID = "get_all_types_by_restaurant_id";
export const GET_ALL_TYPES_BY_RESTAURANT_ID_SUCCESS = "get_all_types_by_restaurant_id_success";
export const GET_ALL_TYPES_BY_RESTAURANT_ID_FAIL = "get_all_types_by_restaurant_id_fail";
export const getAllTypesByRestaurantId = ({dispatch, restaurantId}: { dispatch: Dispatch, restaurantId: string }) => {
    dispatch({
        type: GET_ALL_TYPES_BY_RESTAURANT_ID,
        payload: []
    });

    authFetch(`/restaurants/id/${restaurantId}/typesRestaurant`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_ALL_TYPES_BY_RESTAURANT_ID_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: GET_ALL_TYPES_BY_RESTAURANT_ID_SUCCESS, payload: data})
        }
    }).catch(error => {
        console.log("err", error)
    })
}


export const GET_ALL_SPECIFICS_BY_RESTAURANT_ID = "get_all_specifics_by_restaurant_id";
export const GET_ALL_SPECIFICS_BY_RESTAURANT_ID_SUCCESS = "get_all_specifics_by_restaurant_id_success";
export const GET_ALL_SPECIFICS_BY_RESTAURANT_ID_FAIL = "get_all_specifics_by_restaurant_id_fail";
export const getAllSpecificsByRestaurantId = ({
                                                  dispatch,
                                                  restaurantId
                                              }: { dispatch: Dispatch, restaurantId: string }) => {
    dispatch({
        type: GET_ALL_SPECIFICS_BY_RESTAURANT_ID,
        payload: []
    });

    authFetch(`/restaurants/id/${restaurantId}/specificsRestaurant`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_ALL_SPECIFICS_BY_RESTAURANT_ID_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: GET_ALL_SPECIFICS_BY_RESTAURANT_ID_SUCCESS, payload: data})
        }
    }).catch(error => {
        console.log("err", error)
    })
}


export const GET_RESTAURANT_BY_ID = "get_restaurant_by_id";
export const GET_RESTAURANT_BY_ID_SUCCESS = "get_restaurant_by_id_success";
export const GET_RESTAURANT_BY_ID_FAIL = "get_restaurant_by_id_fail";
export const getRestaurantById = ({dispatch, restaurantId}: { dispatch: Dispatch, restaurantId: string }) => {
    dispatch({type: GET_RESTAURANT_BY_ID, payload: {}});
    authFetch(`/restaurants/id/${restaurantId}`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_RESTAURANT_BY_ID_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data})
    }).catch(error => {
        console.log("error", error)
    })
}

export const GET_TABLES_BY_AREA_ID = "get_table_by_area_id";
export const GET_TABLES_BY_AREA_ID_SUCCESS = "get_table_by_area_id_success";
export const GET_TABLES_BY_AREA_ID_FAIL = "get_table_by_area_id_fail";

export const getTablesByAreaId = ({
                                      dispatch,
                                      restaurantId,
                                      areaId
                                  }: { dispatch: Dispatch, restaurantId: string, areaId: string }) => {
    dispatch({type: GET_TABLES_BY_AREA_ID, payload: {}});
    authFetch(`/restaurants/id/${restaurantId}/areas/${areaId}/tables`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_TABLES_BY_AREA_ID_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: GET_TABLES_BY_AREA_ID_SUCCESS, payload: data})
    }).catch(error => {
        console.log("error", error)
    })
}


export const GET_AREAS_BY_RESTAURANT_ID = "get_restaurant_by_restaurant_id";
export const GET_AREAS_BY_RESTAURANT_ID_SUCCESS = "get_restaurant_by_restaurant_id_success";
export const GET_AREAS_BY_RESTAURANT_ID_FAIL = "get_restaurant_by_restaurant_id_fail";

export const getAreasByRestaurantId = ({dispatch, restaurantId}: { dispatch: Dispatch, restaurantId: string }) => {
    dispatch({type: GET_AREAS_BY_RESTAURANT_ID, payload: {}});
    authFetch(`/restaurants/id/${restaurantId}/areas`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_AREAS_BY_RESTAURANT_ID_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: GET_AREAS_BY_RESTAURANT_ID_SUCCESS, payload: data})
    }).catch(error => {
        console.log("error", error)
    })
}


export const GET_MENU_BY_RESTAURANT_ID = "get_menu_by_restaurant_id";
export const GET_MENU_BY_RESTAURANT_ID_SUCCESS = "get_menu_by_restaurant_id_success";
export const GET_MENU_BY_RESTAURANT_ID_FAIL = "get_menu_by_restaurant_id_fail";


export const getMenuByRestaurantId = ({dispatch, restaurantId}: { dispatch: Dispatch, restaurantId: string }) => {
    dispatch({type: GET_MENU_BY_RESTAURANT_ID, payload: {}});
    authFetch(`/restaurants/id/${restaurantId}/menu`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_MENU_BY_RESTAURANT_ID_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: GET_MENU_BY_RESTAURANT_ID_SUCCESS, payload: data})
        }
    }).catch(error => {
        console.log("error", error)
    })
}


export const GET_AREA_BY_ID = "get_area_by_id";
export const GET_AREA_BY_ID_SUCCESS = "get_area_by_id_success";
export const GET_AREA_BY_ID_FAIL = "get_area_by_id_fail";

export const getAreaById = ({
                                dispatch,
                                areaId,
                                restaurantId
                            }: { dispatch: Dispatch, restaurantId: string, areaId: string }) => {
    dispatch({type: GET_AREA_BY_ID, payload: {}});
    authFetch(`/restaurants/id/${restaurantId}/area/${areaId}`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_AREA_BY_ID_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: GET_AREA_BY_ID_SUCCESS, payload: data})
    }).catch(error => {
        console.log("error", error)
    })
}

export const SET_MARK = "set_mark";
export const setMark = ({dispatch, mark}: { dispatch: Dispatch, mark: any }) => {
    dispatch({type: SET_MARK, payload: mark})
}