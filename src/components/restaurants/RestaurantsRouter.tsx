import React, {lazy, Suspense} from 'react'
import {Route, Switch, withRouter} from "react-router-dom";
import {LoaderComponent} from "../globals/Loader/Loader";

const RestaurantsList = lazy(() => import("./list/RestaurantsList"))
const ViewRestaurant = lazy(() => import("./view/ViewRestaurant"))
const MenuView = lazy(() => import("../menu/view/MenuView"))

const RestaurantsRouter = () => {
    return (
        <Suspense fallback={<LoaderComponent/>}>
            <Switch>
                <Route component={RestaurantsList} path={"/"} exact/>
                <Route component={MenuView} path={"/restaurant/:restaurantId/menu"} exact={false}/>
                <Route component={ViewRestaurant} path={"/restaurant/:restaurantId/reservation"} exact={false}/>
                <Route component={ViewRestaurant} path={"/restaurant/:restaurantId"} exact={false}/>
            </Switch>
        </Suspense>
    )
}
export default withRouter(RestaurantsRouter);