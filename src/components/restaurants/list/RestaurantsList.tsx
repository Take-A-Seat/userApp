import React, {useEffect} from "react";
import {PageWrapper} from "../../globals/GlobalStyles";
import {getAllRestaurants} from "../RestaurantsActions";
import {useRestaurantsDispatch, useRestaurantsState} from "../RestaurantsContext";

const RestaurantsList = () => {
    const dispatch = useRestaurantsDispatch();
    const restaurantState = useRestaurantsState();
    const {restaurants} = restaurantState;
    useEffect(() => {
        getAllRestaurants({dispatch: dispatch})
    }, [])

    console.log(restaurants)
    return (
        <PageWrapper>
            {restaurants.map((restaurant: any, index) => {
                return restaurant.restaurantDetails.name
            })}
        </PageWrapper>
    )
}

export default RestaurantsList