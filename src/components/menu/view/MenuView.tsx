import React, {useEffect} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useRestaurantsDispatch, useRestaurantsState} from "../../restaurants/RestaurantsContext";
import {getMenuByRestaurantId, getRestaurantById} from "../../restaurants/RestaurantsActions";
import {LoaderComponent} from "../../globals/Loader/Loader";
import {PageWrapper} from "../../globals/GlobalStyles";
import BreadCrumbs from "../../globals/breadCrumbs/BreadCrumbs";
import Collapsible from 'react-collapsible';
import "./style.css";
import MaterialIcon from "../../globals/MaterialIcons";
import _ from "lodash";
import {ContainerProduct, DescriptionProduct, PageMenu, TitleProduct} from "./style";

export type  MatchParams = {
    restaurantId: string;
}

interface MenuViewParams extends RouteComponentProps <MatchParams> {

}

const MenuView = ({match}: MenuViewParams) => {
    const {loading, menu, selectedRestaurant} = useRestaurantsState();
    const dispatch = useRestaurantsDispatch();
    useEffect(() => {
        getMenuByRestaurantId({dispatch: dispatch, restaurantId: match.params.restaurantId})
        if (_.isEmpty(selectedRestaurant.restaurantDetails)|| selectedRestaurant.restaurantDetails.id != match.params.restaurantId) {
            getRestaurantById({dispatch: dispatch, restaurantId: match.params.restaurantId})
        }
    }, [match.params.restaurantId])

    console.log(menu)
    return !loading ? <PageWrapper centerPage customWidth={"75%"} fullHeight>
        <BreadCrumbs/>
        {
            menu && !_.isEmpty(menu) && menu.pages.map((page: any, indexPage: number) => {
                return (<PageMenu key={indexPage}>
                    {
                        page.sections.map((section: any, indexSection: number) => {
                            return <Collapsible key={indexSection} open={indexSection == 0} transitionTime={500}
                                                trigger={[`${section.titleSection}`,
                                                    // @ts-ignore
                                                    <MaterialIcon iconName={"expand_more"}/>]}>
                                {
                                    section.products.map((product: any,indexProduct:number) => {
                                        return <ContainerProduct key={indexProduct}><TitleProduct>{product.name} - {product.price} lei</TitleProduct>
                                            <DescriptionProduct>{product.ingredients}</DescriptionProduct>
                                        </ContainerProduct>
                                    })
                                }
                            </Collapsible>
                        })
                    }
                </PageMenu>)
            })
        }


    </PageWrapper> : <LoaderComponent/>
}

export default withRouter(MenuView)