import React, {useEffect, useState} from "react";
import {RouteComponentProps, useHistory, withRouter} from "react-router-dom";
import {PageWrapper} from "../../globals/GlobalStyles";
import BreadCrumbs from "../../globals/breadCrumbs/BreadCrumbs";
import {useRestaurantsDispatch, useRestaurantsState} from "../../restaurants/RestaurantsContext";
import {getRestaurantById} from "../../restaurants/RestaurantsActions";
import _ from "lodash";
import {createReservation, getAvailableFreeHours} from "../ReservationActions";
import {useReservationDispatch, useReservationState} from "../ReservationContext";
import moment from "moment";
import {CreateReservationForm} from "../form/CreateReservationForm";
import {ContainerFields} from "../form/style";

export type MatchParams = {
    restaurantId: string;
}

interface CreateReservationParams extends RouteComponentProps <MatchParams> {

}


const CreateReservation = ({match}: CreateReservationParams) => {
    const restaurantDispatch = useRestaurantsDispatch();
    const restaurantState = useRestaurantsState();
    const reservationDispatch = useReservationDispatch();
    const reservationState = useReservationState();
    const {listAvailableReservation, loading, error} = reservationState;
    const {selectedRestaurant} = restaurantState;
    const history = useHistory();
    console.log(selectedRestaurant)
    useEffect(() => {
        if (_.isEmpty(selectedRestaurant.restaurantDetails) || selectedRestaurant.restaurantDetails.id != match.params.restaurantId) {
            getRestaurantById({dispatch: restaurantDispatch, restaurantId: match.params.restaurantId})
        }

    }, [match.params.restaurantId])
    const [selectedStartHour, setSelectedStartHour] = useState("");
    const [selectedEndHour, setSelectedEndHour] = useState("");
    const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));
    const [selectedNumberPersons, setNumberPersons] = useState(2);

    useEffect(() => {
        if (listAvailableReservation.length > 0) {
            setSelectedStartHour(listAvailableReservation[0].timeString)
            setSelectedEndHour(listAvailableReservation[0].timeString)
        }
    }, [listAvailableReservation])

    const initialValues = {
        persons: 2,
        phone: "",
        firstName: "",
        lastName: "",
        email: "",
        details: "",
        restaurantId: match.params.restaurantId,
        startReservationDate: selectedStartHour,
        endReservationDate: selectedEndHour,
        reservationDate: selectedDay
    }

    useEffect(() => {
        setSelectedStartHour("")
        setSelectedEndHour("")
        getAvailableFreeHours({
            dispatch: reservationDispatch,
            restaurantId: match.params.restaurantId,
            date: selectedDay,
            persons: selectedNumberPersons
        })
    }, [selectedDay, selectedNumberPersons])

    const onSubmit = (values: any) => {
        console.log(values)
        let startReservation = listAvailableReservation.find(elementAvailable => elementAvailable.timeString == selectedStartHour)
        let endReservation = listAvailableReservation.find(elementAvailable => elementAvailable.timeString == selectedEndHour)
        createReservation({
            dispatch: reservationDispatch,
            restaurantId: match.params.restaurantId,
            values: {
                persons: selectedNumberPersons,
                phone: values.phone,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                details: values.details,
                restaurantId: match.params.restaurantId,
                startReservationDate: startReservation ? startReservation.dateTime : "",
                endReservationDate: endReservation ? endReservation.dateTime : ""
            },
            callBack: () => {
                history.push(`/restaurant/${match.params.restaurantId}`)
            }
        })
    }

    return <PageWrapper centerPage customWidth={"75%"} fullHeight>
        <BreadCrumbs/>
        <ContainerFields>
            <CreateReservationForm initialValues={initialValues}
                                   listAvailableReservation={listAvailableReservation}
                                   selectedStartHour={selectedStartHour}
                                   selectedEndHour={selectedEndHour}
                                   error={error}
                                   cancel={() => {
                                       history.push(`/restaurant/${match.params.restaurantId}`)
                                   }}
                                   onSubmit={(values) => {
                                       onSubmit(values)
                                   }}
                                   setStartHour={(value) => {
                                       setSelectedStartHour(value)
                                       setSelectedEndHour(value)
                                   }}
                                   setEndHour={(value) => {
                                       setSelectedEndHour(value)
                                   }}
                                   selectedDay={selectedDay} setSelectedDay={(day) => {
                setSelectedDay(day)
            }}
                                   selectedNumberPersons={selectedNumberPersons}
                                   setNumberPersons={(value) => setNumberPersons(value)}
            />
        </ContainerFields>
    </PageWrapper>
}

export default withRouter(CreateReservation)