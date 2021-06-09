import React, {useEffect} from "react";
import {RouteComponentProps, useHistory, withRouter} from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {useRestaurantsDispatch, useRestaurantsState} from "../RestaurantsContext";
import {getAllSpecifics, getAllTypesRestaurant, getRestaurantById} from "../RestaurantsActions";
import {LoaderComponent} from "../../globals/Loader/Loader";
import {
    ContainerCharacteristics,
    DescriptionText,
    DetailsRestaurantCard,
    ImagesGalleryContainer,
    ImagesGallerySection,
    ProgramContainer,
    ProgramElementContainer,
    SectionElement,
    SectionName,
    SectionViewRestaurant,
    TitleBoldProgram
} from "./style";
import {
    Button,
    LocationRestaurant,
    PageWrapper,
    SpecificAndTypeSectionContainer,
    SpecificElement,
    TitleRestaurant
} from "../../globals/GlobalStyles";
import {Icon} from '@iconify/react';
import chefHat from '@iconify-icons/mdi/chef-hat';
import _ from "lodash";
import MaterialIcon from "../../globals/MaterialIcons";
import {FullAddress} from "../../../helpers/sharedFunctions";
import Map from "../../globals/Maps/Map";
import {ProgramElement} from "./ProgramElement";
import BreadCrumbs from "../../globals/breadCrumbs/BreadCrumbs";

export type MatchParams = {
    restaurantId: string;
}

interface ViewRestaurantParams extends RouteComponentProps <MatchParams> {

}

const images = [
    {
        original: 'https://miro.medium.com/max/11192/0*dkW9pVK3_mZ4mEKG',
        thumbnail: 'https://miro.medium.com/max/11192/0*dkW9pVK3_mZ4mEKG',
        originalHeight: 300,
    },
    {
        original: 'https://www.salvocorp.com/wp-content/uploads/2018/12/Salvocorp_201812_SMM-10-Body-2.jpg',
        thumbnail: 'https://www.salvocorp.com/wp-content/uploads/2018/12/Salvocorp_201812_SMM-10-Body-2.jpg',
        originalHeight: 300,
    },
    {
        original: 'https://i2.wp.com/www.eatthis.com/wp-content/uploads/2020/07/restaurant-food.jpg?resize=640%2C360&ssl=1',
        thumbnail: 'https://i2.wp.com/www.eatthis.com/wp-content/uploads/2020/07/restaurant-food.jpg?resize=640%2C360&ssl=1',
        originalHeight: 300,
    },
];

const ViewRestaurant = ({match}: ViewRestaurantParams) => {
    const dispatch = useRestaurantsDispatch();
    const restaurantState = useRestaurantsState();
    const {loading, listSpecifics, listTypes, error, selectedRestaurant} = restaurantState;
    const history = useHistory();
    useEffect(() => {
        if (_.isEmpty(listTypes)) {
            getAllTypesRestaurant({dispatch: dispatch});
        }

        if (_.isEmpty(listSpecifics)) {
            getAllSpecifics({dispatch: dispatch})
        }

        if (_.isEmpty(selectedRestaurant.restaurantDetails) || selectedRestaurant.restaurantDetails.id != match.params.restaurantId) {
            getRestaurantById({dispatch: dispatch, restaurantId: match.params.restaurantId})
        }
    }, [match.params.restaurantId])


    let d = new Date();
    let numberDay = d.getDay();
    let fullAddress = selectedRestaurant && !_.isEmpty(selectedRestaurant) && FullAddress(selectedRestaurant)
    return !loading ? <PageWrapper centerPage customWidth={"75%"}>
            <BreadCrumbs/>
            <ImagesGallerySection>
                <ImagesGalleryContainer>
                    <ImageGallery items={images} lazyLoad={true} slideDuration={3500} useTranslate3D={true}
                                  autoPlay={true}/>
                </ImagesGalleryContainer>
                <DetailsRestaurantCard>
                    <TitleRestaurant>{selectedRestaurant.restaurantDetails && selectedRestaurant.restaurantDetails.name}</TitleRestaurant>
                    {/*TO-DO de adaugat stele in functie de rating*/}
                    <Button redButton
                            customWidth={"100%"}
                            centerText
                            onClick={() => history.push(`/restaurant/${selectedRestaurant.restaurantDetails.id}/reservation-add`)}>Reserve
                        a table online</Button>
                    <SpecificAndTypeSectionContainer withPaddingTop>
                        <Icon icon={chefHat}/>
                        {selectedRestaurant && !_.isEmpty(selectedRestaurant.listSpecifics) && selectedRestaurant.listSpecifics.map((element: any) => {
                            let index = listSpecifics.find(specific => specific.id === element.specificRestaurantId)
                            return <SpecificElement
                                noBackgroundAndMargin>{index != undefined ? index.name : ""}</SpecificElement>
                        })}
                    </SpecificAndTypeSectionContainer>
                    <Button secondaryButton
                            customWidth={"100%"}
                            centerText
                            onClick={() => history.push(`/restaurant/${selectedRestaurant.restaurantDetails.id}/menu`)}>
                        See the meniu
                    </Button>
                    <LocationRestaurant paddingTop><MaterialIcon
                        iconName={"location_on"}/> {fullAddress}
                    </LocationRestaurant>
                </DetailsRestaurantCard>
            </ImagesGallerySection>
            <SectionViewRestaurant>
                <DescriptionText>{selectedRestaurant && selectedRestaurant.restaurantDetails ? selectedRestaurant.restaurantDetails.description : ""}</DescriptionText>
                <Map
                    lat={selectedRestaurant.restaurantDetails !== undefined ? selectedRestaurant.restaurantDetails.lat : 45}
                    lng={selectedRestaurant.restaurantDetails !== undefined ? selectedRestaurant.restaurantDetails.lng : 45}/>
            </SectionViewRestaurant>
            <SectionViewRestaurant program={true}>
                <DescriptionText>
                    <ProgramContainer>
                        <TitleBoldProgram>Program</TitleBoldProgram>
                        {
                            selectedRestaurant.restaurantDetails !== {} && !_.isEmpty(selectedRestaurant.restaurantDetails) && selectedRestaurant.restaurantDetails.program.map((program: any, index: number) => {
                                return <ProgramElement program={program} boldText={(index + 1) % 7 === numberDay}/>
                            })
                        }
                    </ProgramContainer>
                </DescriptionText>
                <ContainerCharacteristics>
                    <TitleBoldProgram>Characteristics</TitleBoldProgram>
                    <SpecificAndTypeSectionContainer>
                        {
                            selectedRestaurant.listTypes !== [] && !_.isEmpty(selectedRestaurant.listTypes) && selectedRestaurant.listTypes.map((typeRestaurant: any, index: number) => {
                                const typeRestaurantFind = listTypes.find((element) => element.id === typeRestaurant.typeRestaurantId)
                                return <SpecificElement
                                    key={index}>{typeRestaurantFind !== undefined ? typeRestaurantFind.name : ""}</SpecificElement>
                            })
                        }
                    </SpecificAndTypeSectionContainer>
                </ContainerCharacteristics>
            </SectionViewRestaurant>
            <SectionViewRestaurant program={true} alignRight={true}>
                <TitleBoldProgram>Contact</TitleBoldProgram>
                <ProgramContainer>
                    {
                        selectedRestaurant.restaurantDetails && !_.isEmpty(selectedRestaurant.restaurantDetails) ? <>
                            <ProgramElementContainer><SectionName>Phone</SectionName><SectionElement> {selectedRestaurant.restaurantDetails.phone}</SectionElement></ProgramElementContainer>
                            {selectedRestaurant.restaurantDetails.website != "" ?
                                <ProgramElementContainer><SectionName>Website</SectionName><SectionElement>{selectedRestaurant.restaurantDetails.website}</SectionElement></ProgramElementContainer> : null}
                            {selectedRestaurant.restaurantDetails.facebook != "" ?
                                <ProgramElementContainer><SectionName>Facebook</SectionName><SectionElement>{selectedRestaurant.restaurantDetails.facebook}</SectionElement></ProgramElementContainer> : null}
                            {selectedRestaurant.restaurantDetails.instagram != "" ?
                                <ProgramElementContainer><SectionName>Instagram</SectionName><SectionElement>{selectedRestaurant.restaurantDetails.instagram}</SectionElement></ProgramElementContainer> : null}
                            {selectedRestaurant.restaurantDetails.twitter != "" ?
                                <ProgramElementContainer><SectionName>Twitter</SectionName><SectionElement>{selectedRestaurant.restaurantDetails.twitter}</SectionElement></ProgramElementContainer> : null}
                        </> : null
                    }

                </ProgramContainer>
            </SectionViewRestaurant>
        </PageWrapper>
        :
        <LoaderComponent/>
}

export default withRouter(ViewRestaurant);