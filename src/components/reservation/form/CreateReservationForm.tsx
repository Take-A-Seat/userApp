import {Field, Formik} from "formik";
import React, {useMemo} from "react";
import {FieldError, FieldWrapper} from "../../globals/formComponents/style";
import DatePickerField from "../../globals/formComponents/DatePickerField";
// @ts-ignore
import HorizontalScroller from 'react-horizontal-scroll-container';
import _ from "lodash";
import {ContainerHorizontal, ElementAvailableReservation, TitleReservation} from "./style";
import moment from "moment";
import TextField from "../../globals/formComponents/TextField";
import {Button, Wrapper} from "../../globals/GlobalStyles";
import MaterialIcon from "../../globals/MaterialIcons";
import * as Yup from "yup";

export type CreateReservationFormProp = {
    initialValues: any;
    listAvailableReservation: { timeString: string, dateTime: string }[];
    setStartHour: (value: string) => void;
    selectedStartHour: string;
    setEndHour: (value: string) => void;
    selectedEndHour: string;
    selectedDay: any;
    error: any;
    setSelectedDay: (day: any) => void;
    selectedNumberPersons: any;
    setNumberPersons: (number: number) => void;
    onSubmit: (values: any) => void;
    cancel?: () => void;
}
let listNumberPersons: number[] = [];

const validationSchemas = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required")
});


export const CreateReservationForm = ({
                                          initialValues,
                                          listAvailableReservation,
                                          selectedStartHour,
                                          setStartHour,
                                          selectedEndHour,
                                          setEndHour,
                                          selectedDay,
                                          setSelectedDay,
                                          selectedNumberPersons,
                                          setNumberPersons,
                                          error,
                                          cancel, onSubmit
                                      }: CreateReservationFormProp) => {
    useMemo(() => {
        for (let index = 1; index <= 50; index++) {
            listNumberPersons.push(index)
        }
    }, [])

    return (<Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validateOnChange={true}

        validationSchema={validationSchemas}
        onSubmit={(values) => {
            onSubmit(values);
        }}
    >{
        ({values, handleSubmit, errors, handleChange, touched, handleBlur}) => {
            return (
                <FieldWrapper onSubmit={handleSubmit}>
                    <ContainerHorizontal>
                        <TitleReservation>Number persons:</TitleReservation>

                        <HorizontalScroller>
                            {listNumberPersons && listNumberPersons.map((number: any, index: number) => {
                                return <ElementAvailableReservation
                                    numberElement={true}
                                    selected={selectedNumberPersons == number}
                                    onClick={() => {
                                        setNumberPersons(number);
                                    }
                                    }>{number}</ElementAvailableReservation>
                            })}
                        </HorizontalScroller>
                    </ContainerHorizontal>
                    <ContainerHorizontal noPadding>
                        <TitleReservation>
                            Date reservation:
                        </TitleReservation>
                        <Field
                            name={"reservationDate"}
                            component={DatePickerField}
                            specificFormat
                            big
                            onChangeExtra={(value: any) => {
                                console.log(value)
                                setSelectedDay(value)
                            }}
                            minDate={moment().utc().format("YYYY-MM-DD")}
                        />
                    </ContainerHorizontal>
                    {error != "" && error ? <FieldError> {error}</FieldError> :
                        <>
                            {
                                listAvailableReservation.length > 0 ? <><ContainerHorizontal>
                                    <TitleReservation>Start Hour</TitleReservation>
                                    <HorizontalScroller>
                                        {listAvailableReservation && !_.isEmpty(listAvailableReservation) && listAvailableReservation.map((available: any, index: number) => {
                                            return <ElementAvailableReservation
                                                selected={selectedStartHour == available.timeString}
                                                onClick={() => {
                                                    setStartHour(available.timeString);
                                                }
                                                }>{available.timeString}</ElementAvailableReservation>
                                        })}
                                    </HorizontalScroller>

                                </ContainerHorizontal>
                                    <ContainerHorizontal>
                                        <TitleReservation>End Hour</TitleReservation>
                                        <HorizontalScroller>
                                            {listAvailableReservation && !_.isEmpty(listAvailableReservation) && listAvailableReservation.map((available: any, index: number) => {
                                                let indexStart = listAvailableReservation.findIndex(start => start.timeString == selectedStartHour)
                                                if (index >= indexStart) {
                                                    return <ElementAvailableReservation
                                                        selected={selectedEndHour == available.timeString}
                                                        onClick={() => {
                                                            setEndHour(available.timeString);
                                                        }
                                                        }>{available.timeString}</ElementAvailableReservation>
                                                }
                                            })}
                                        </HorizontalScroller>
                                    </ContainerHorizontal></> : <FieldError>Closed/Full</FieldError>
                            }

                        </>
                    }


                    <ContainerHorizontal noPadding>
                        <TitleReservation>
                            First name:
                        </TitleReservation>
                        <Field
                            name={"firstName"}
                            component={TextField}
                            noDescription
                            type={'text'}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            customPaddingTopInput={"0"}
                            customPaddingBottomInput={"0"}
                            customMaxWidth={"100%"} customWidthInput={"100%"}
                        />
                    </ContainerHorizontal>

                    <ContainerHorizontal noPadding>
                        <TitleReservation>
                            Last name:
                        </TitleReservation>
                        <Field
                            name={"lastName"}
                            component={TextField}
                            noDescription
                            type={'text'}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            customPaddingTopInput={"0"}
                            customPaddingBottomInput={"0"}
                            customMaxWidth={"100%"} customWidthInput={"100%"}
                        />
                    </ContainerHorizontal>

                    <ContainerHorizontal>
                        <TitleReservation>
                            Email:
                        </TitleReservation>
                        <Field
                            name={"email"}
                            component={TextField}
                            noDescription
                            type={'email'}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            customPaddingTopInput={"0"}
                            customPaddingBottomInput={"0"}
                            customMaxWidth={"100%"} customWidthInput={"100%"}
                        />
                    </ContainerHorizontal>

                    <ContainerHorizontal noPadding>
                        <TitleReservation>
                            Phone:
                        </TitleReservation>
                        <Field
                            name={"phone"}
                            component={TextField}
                            noDescription
                            type={'text'}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            customPaddingTopInput={"0"}
                            customPaddingBottomInput={"0"}
                            customMaxWidth={"100%"} customWidthInput={"100%"}
                        />
                    </ContainerHorizontal>
                    <ContainerHorizontal noPadding>
                        <TitleReservation>
                            Details:
                        </TitleReservation>
                        <Field
                            name={"details"}
                            component={TextField}
                            textArea={true}
                            noDescription
                            type={'text'}
                            customHeight={"100px"}
                            customPaddingTopInput={"0"}
                            customPaddingBottomInput={"0"}
                            customMaxWidth={"100%"} customWidthInput={"100%"}
                        />
                    </ContainerHorizontal>

                    <Wrapper>
                        {cancel && <Button blackText
                                           alignedLeft
                                           onClick={() => {
                                               cancel()
                                           }} cancelButton>
                            <MaterialIcon iconName={"cancel"}/>
                            Cancel
                        </Button>}

                        <Button alignedLeft onClick={handleSubmit} redButton>
                            <MaterialIcon iconName={"send"}/>
                            Send Reservation</Button>
                    </Wrapper>
                </FieldWrapper>
            )
        }
    }

    </Formik>)
}