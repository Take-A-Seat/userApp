import React, {useEffect} from "react";
import {PageWrapper, RestaurantsListContainer} from "../../globals/GlobalStyles";
import {getAllRestaurants, getAllSpecifics, getAllTypesRestaurant} from "../RestaurantsActions";
import {useRestaurantsDispatch, useRestaurantsState} from "../RestaurantsContext";
import {LoaderComponent} from "../../globals/Loader/Loader";
import RestaurantContainer from "../form/RestaurantContainer";
import _ from "lodash";

const RestaurantsList = () => {
    const dispatch = useRestaurantsDispatch();
    const restaurantState = useRestaurantsState();
    const {restaurants, loading, listSpecifics, listTypes} = restaurantState;
    useEffect(() => {
        getAllSpecifics({dispatch: dispatch});
        getAllTypesRestaurant({dispatch: dispatch})
        getAllRestaurants({dispatch: dispatch});
    }, [])

        return !loading?<PageWrapper>
                <RestaurantsListContainer>
                    {restaurants && !_.isEmpty(restaurants) && restaurants.map((restaurant: any, index) => {
                        return <RestaurantContainer key={index} values={restaurant} listSpecifics={listSpecifics}
                                                    listTypes={listTypes} />
                    })}
                </RestaurantsListContainer>
            </PageWrapper>:<LoaderComponent/>

}

export default RestaurantsList;