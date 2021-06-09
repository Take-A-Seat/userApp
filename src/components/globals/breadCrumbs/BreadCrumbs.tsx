import React, {useEffect, useState} from 'react'
import {BreadCrumbName, BreadCrumbsDelimiter, BreadCrumbsWrapper, BreadCrumbWrapper} from './styles'
import {useHistory} from "react-router-dom";
import {History} from "history";
import _ from "lodash";
// @ts-ignore
import QueryString from "query-string";
import {useRestaurantsState} from "../../restaurants/RestaurantsContext";


export type BreadCrumbType = {
    name: string;
    link: string;
    customOnClick?: boolean;
    crumbType?: string;
    id?: string;
    restaurantId?: string;
}

export const getBreadCrumbs = ({
                                   history,
                                   restaurantName,
                                   items,
                               }: {
                                   history: History,
                                   restaurantName: string,
                                   items: { name: string, label: string, needsSecondLink?: boolean }[],
                               }
) => {
    const initialPages = history.location.pathname.split("/");
    const pages = history.location.pathname.split("/");

    initialPages.shift();
    pages.shift();
    const restaurantByIdRoute = `/restaurant/${pages[1]}`;
    const breadCrumbs = [{
        name: `Restaurant: ${restaurantName}`,
        link: restaurantByIdRoute
    }] as BreadCrumbType[];
    pages.splice(0, 2);

    const createBreadCrumbsArray = ({pages}: { pages: string[] }) => {
        if (pages.length === 0) {
            return
        }
        if (pages[0] !== "groups") {
            const foundInItems = _.findIndex(items, item => item.name === pages[0]);
            const indexInInitialPages = _.findIndex(initialPages, pg => pg === pages[0]);
            let link = `/${initialPages.slice(0, indexInInitialPages + 1).join('/')}`;

            if (foundInItems > -1) {
                if (items[foundInItems].needsSecondLink) {
                    link = `${link}/${pages[1]}`;
                    pages.splice(0, 2);
                } else {
                    pages.shift()
                }

                breadCrumbs.push({
                    name: items[foundInItems].label,
                    link: link
                });
                createBreadCrumbsArray({pages});
            }
        }
    };

    createBreadCrumbsArray({pages});
    return breadCrumbs;
};

const BreadCrumbs = () => {
    const history = useHistory();
    const {selectedRestaurant,menu} = useRestaurantsState();

    let items = [
        {
            name: "menu",
            label: `Menu`,
        }, {
            name: "reservation-add",
            label: `Create Reservation`,
        }
    ];


    const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumbType[]>([]);
    useEffect(() => {
        const bc = getBreadCrumbs({
            history,
            restaurantName: selectedRestaurant.restaurantDetails !== undefined ? selectedRestaurant.restaurantDetails.name : "",
            items,
        });
        setBreadCrumbs(bc)
    }, [history.location.pathname, history.location.search, selectedRestaurant,menu])

    return (
        <BreadCrumbsWrapper>
            {
                breadCrumbs.map((breadCrumb, index) =>
                    <BreadCrumbWrapper key={index}>
                        <BreadCrumbName
                            currentBreadCrumb={(index + 1) === breadCrumbs.length}
                            onClick={() => {
                                history.push(breadCrumb.link)
                            }}
                        >
                            {breadCrumb.name}
                        </BreadCrumbName>
                        {
                            (index + 1) < breadCrumbs.length &&
                            <BreadCrumbsDelimiter/>
                        }
                    </BreadCrumbWrapper>
                )
            }
        </BreadCrumbsWrapper>
    )
};

export default BreadCrumbs