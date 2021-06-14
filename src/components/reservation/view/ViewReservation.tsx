import React, {useEffect, useState} from "react";
import {RouteComponentProps, useHistory, withRouter} from "react-router-dom";
import {setupWebSocket, useReservationDispatch, useReservationState} from "../ReservationContext";
import {LoaderComponent} from "../../globals/Loader/Loader";
import {getReservation, updateAssistanceReservation, updateProductsReservation} from "../ReservationActions";
import BreadCrumbs from "../../globals/breadCrumbs/BreadCrumbs";
import {
    ProductFormValuesTypes,
    useRestaurantsDispatch,
    useRestaurantsState
} from "../../restaurants/RestaurantsContext";
import {getMenuByRestaurantId, getRestaurantById} from "../../restaurants/RestaurantsActions";
import _ from "lodash";
import {HorizontalDelimiter, PageWrapper} from "../../globals/GlobalStyles";
import {ContainerFields} from "../form/style";
import "./style";
import {AbsoluteContainer, DetailContainer, LastElement, SpaceAroundContainer, TextDetail} from "./style";
import MaterialIcon from "../../globals/MaterialIcons";
import moment from "moment/moment";
import ManageReservation from "../form/ManageReservation";
import Popup from "../../globals/popup/Popup";
import Logo from "../../../assets/Asset 5 (1).svg";
import {NoFoundPage} from "../../404/NoFound";
import {DropdownElement} from "../../globals/dropdown/Dropdown";
import ContextualMenu from "../../globals/dropdown/ContextualMenu";

export type MatchParams = {
    restaurantId: string;
    email: string;
    code: string;
}

interface ViewRestaurantParams extends RouteComponentProps <MatchParams> {

}

const ViewReservation = ({match}: ViewRestaurantParams) => {
    const dispatch = useReservationDispatch();
    const dispatchRestaurant = useRestaurantsDispatch();
    const {selectedRestaurant, menu} = useRestaurantsState();
    const {loading, selectedReservation, error, recreateConnection} = useReservationState();
    let [manageReservation, setManageReservationPopup] = useState(false)
    let history = useHistory();
    const autoReconnectDelay = 8000

    useEffect(() => {
            let wsReservation: WebSocket | undefined;
            if (selectedReservation.id != "" && recreateConnection) {
                wsReservation = setupWebSocket(selectedReservation.id, dispatch)
            }

            return () => {
                setTimeout(() => {
                    if (wsReservation) {
                        wsReservation.close();
                    }
                }, autoReconnectDelay)
                console.log('unmounting...')
            }


        }, [selectedReservation, recreateConnection]
    )

    useEffect(() => {
        getReservation({
            dispatch: dispatch,
            email: match.params.email,
            code: match.params.code,
            restaurantId: match.params.restaurantId
        })

        if (!_.isEmpty(selectedRestaurant.restaurantDetails) || selectedRestaurant.restaurantDetails.id != match.params.restaurantId) {
            getRestaurantById({dispatch: dispatchRestaurant, restaurantId: match.params.restaurantId})
        }
    }, [match])


    console.log(selectedRestaurant)
    useEffect(() => {
        if (!_.isEmpty(selectedRestaurant.restaurantDetails) && selectedRestaurant.restaurantDetails) {
            getMenuByRestaurantId({dispatch: dispatchRestaurant, restaurantId: selectedRestaurant.restaurantDetails.id})
        }
    }, [selectedRestaurant, match])


    let startDate = moment(selectedReservation.startReservationDate).utc().format("YYYY-MM-DD HH:mm")
    let endDate = moment(selectedReservation.endReservationDate).utc().format("HH:mm")
    const lastElementId = `reservationListing-elem`;
    const dropDownElements: DropdownElement[] = [{
        text: "Edit order", icon: "edit", onClick: () => {
            setManageReservationPopup(true)
        }
    }];
    if (!selectedReservation.needAssistance && selectedReservation.status == "Active") {
        dropDownElements.push({
            text: "Need assistance", icon: "help_center", onClick: () => updateAssistanceReservation({
                reservationId: selectedReservation.id,
                dispatch: dispatch,
                values: {
                    ...selectedReservation,
                    needAssistance: true
                },
                callBack: () => {
                }
            })
        })
    }
    console.log(error)
    return !loading ? <PageWrapper centerPage customWidth={"75%"} fullHeight>
        <BreadCrumbs/>
        {error != "" ? <NoFoundPage/> : <>
            <AbsoluteContainer>
                {!_.isEmpty(selectedRestaurant.restaurantDetails) &&
                <img src={selectedRestaurant.restaurantDetails.logo.path} alt={"Logo"}/>}
            </AbsoluteContainer>
            <ContainerFields>
                <DetailContainer>
                    <MaterialIcon iconName={"event"}/>
                    <TextDetail>{startDate} - {endDate}</TextDetail>
                </DetailContainer>
                <DetailContainer>
                    <MaterialIcon iconName={"person"}/> <TextDetail>{selectedReservation.persons} people</TextDetail>
                </DetailContainer>
                <DetailContainer>
                    <MaterialIcon iconName={"textsms"}/>
                    <TextDetail>{selectedReservation.firstName}: {selectedReservation.details}</TextDetail>
                </DetailContainer>
                <DetailContainer>
                    <MaterialIcon iconName={"comment"}/>
                    <TextDetail>{selectedRestaurant.restaurantDetails ? selectedRestaurant.restaurantDetails.name : ""}: {selectedReservation.messageToClient}</TextDetail>
                </DetailContainer>


                <DetailContainer>
                    <MaterialIcon iconName={"room_service"}/>
                    <TextDetail>Status Reservation: {selectedReservation.status}</TextDetail>
                </DetailContainer>

                {selectedReservation.needAssistance && <DetailContainer>
                    <MaterialIcon iconName={"help_center"}/>
                    <TextDetail>Need assistance: Wait waiter</TextDetail>
                </DetailContainer>}

                <DetailContainer>
                    <MaterialIcon iconName={"monetization_on"}/>
                    <TextDetail>Total {selectedReservation.totalToPay}$</TextDetail>
                </DetailContainer>
                <HorizontalDelimiter/>
                <LastElement>
                    <ContextualMenu
                        icon={"more_vert"}
                        id={lastElementId}
                        dropdownElements={dropDownElements}
                        history={history}
                    />
                </LastElement>
                {selectedReservation.products.map((product:ProductFormValuesTypes)=>{
                    return  <DetailContainer>

                        <MaterialIcon iconName={"local_dining"}/>
                        <SpaceAroundContainer>
                        <TextDetail>{product.name} - {product.price}$</TextDetail>
                            <TextDetail>{product.status =="New"?"Unread":product.status}</TextDetail>

                        </SpaceAroundContainer>
                    </DetailContainer>
                })}
            </ContainerFields>
        </>}


        <Popup
            show={manageReservation}
            iconTitle={"home"}
            customMaxWidth={"80%"}
            customWidth={"80%"}
            popupDetails={{title: `Manage Reservation - ${selectedReservation.firstName} ${selectedReservation.lastName}`}}
            onClose={() => setManageReservationPopup(false)}
        >
            <ManageReservation
                cancel={() => {
                    setManageReservationPopup(false)
                }}
                onSubmit={(values) => {
                    updateProductsReservation({
                        dispatch: dispatch, reservationId: values.id, values, callBack: () => {
                            setManageReservationPopup(false);
                        }
                    })
                }} initialValues={selectedReservation} menu={menu}/>
        </Popup>
    </PageWrapper> : <LoaderComponent/>
}

export default withRouter(ViewReservation);