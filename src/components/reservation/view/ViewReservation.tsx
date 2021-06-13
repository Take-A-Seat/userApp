import React, {useEffect, useState} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useReservationDispatch, useReservationState} from "../ReservationContext";
import {LoaderComponent} from "../../globals/Loader/Loader";
import {FieldError} from "../../globals/formComponents/style";
import {getReservation, updateProductsReservation} from "../ReservationActions";
import BreadCrumbs from "../../globals/breadCrumbs/BreadCrumbs";
import {useRestaurantsDispatch, useRestaurantsState} from "../../restaurants/RestaurantsContext";
import {getMenuByRestaurantId, getRestaurantById} from "../../restaurants/RestaurantsActions";
import _ from "lodash";
import {Button, PageWrapper} from "../../globals/GlobalStyles";
import {ContainerFields} from "../form/style";
import "./style";
import {AbsoluteContainer, DetailContainer, TextDetail} from "./style";
import MaterialIcon from "../../globals/MaterialIcons";
import moment from "moment/moment";
import ManageReservation from "../form/ManageReservation";
import Popup from "../../globals/popup/Popup";
import Logo from "../../../assets/Asset 5 (1).svg";

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
    const {loading, selectedReservation, error} = useReservationState();
    let [manageReservation, setManageReservationPopup] = useState(false)

    useEffect(() => {
        getReservation({
            dispatch: dispatch,
            email: match.params.email,
            code: match.params.code,
            restaurantId: match.params.restaurantId
        })

        if (_.isEmpty(selectedRestaurant.restaurantDetails) || selectedRestaurant.restaurantDetails.id != match.params.restaurantId) {
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
    console.log(error)
    return !loading ? <PageWrapper centerPage customWidth={"75%"} fullHeight>
        <BreadCrumbs/>
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
                <MaterialIcon iconName={"monetization_on"}/>
                <TextDetail>Total {selectedReservation.totalToPay}$</TextDetail>
            </DetailContainer>

            <DetailContainer>
                <MaterialIcon iconName={"room_service"}/>
                <TextDetail>Status Reservation: {selectedReservation.status}</TextDetail>
            </DetailContainer>
        </ContainerFields>
        <Button redButton
                customWidth={"95%"}
                customMarginRight={"0"}
                centerText
                onClick={() => setManageReservationPopup(true)}>Edit order</Button>

        {selectedReservation.status == "Pending" || selectedReservation.status == "Wait Client" &&
        <Button redButton
                customWidth={"95%"}
                customMarginRight={"0"}
                centerText
                onClick={() => alert("To do")}>Cancel Reservation</Button>
        }

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
                    console.log(values)
                    updateProductsReservation({
                        dispatch: dispatch, reservationId: values.id, values, callBack: () => {
                            setManageReservationPopup(false);
                            getReservation({
                                dispatch: dispatch,
                                restaurantId: values.restaurantId,
                                code: values.code,
                                email: values.email
                            })
                        }
                    })
                }} initialValues={selectedReservation} menu={menu}/>
        </Popup>
        {error != "" ? <FieldError alignCenter>{error}</FieldError> : null}
    </PageWrapper> : <LoaderComponent/>
}

export default withRouter(ViewReservation);