import React, {Suspense} from 'react'
import {Route, Switch, withRouter} from "react-router-dom";
import RestaurantsList from "./list/RestaurantsList";

const RestaurantsRouter = () => {
    return (
        <Suspense fallback={<div/>}>
            <Switch>
                <Route component={RestaurantsList} path={"/"} exact/>

            </Switch>
        </Suspense>
    )
}
export default withRouter(RestaurantsRouter)