import React, {useEffect} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {useRestaurantsDispatch, useRestaurantsState} from "../RestaurantsContext";
import {getAllSpecifics, getAllTypesRestaurant, getRestaurantById} from "../RestaurantsActions";
import {LoaderComponent} from "../../globals/Loader/Loader";
import {
    DescriptionAndMapSection,
    DescriptionText,
    DetailsRestaurantCard,
    ImagesGalleryContainer,
    ImagesGallerySection
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

    useEffect(() => {
        getRestaurantById({dispatch: dispatch, restaurantId: match.params.restaurantId})
        getAllTypesRestaurant({dispatch: dispatch});
        getAllSpecifics({dispatch: dispatch})
    }, [match.params.restaurantId])
    console.log(error)
    console.log("selectedRestaurant", selectedRestaurant)
    let fullAddress = selectedRestaurant && !_.isEmpty(selectedRestaurant) && FullAddress(selectedRestaurant)
    return !loading ? <PageWrapper centerPage>
        <ImagesGallerySection>
            <ImagesGalleryContainer>
                <ImageGallery items={images} lazyLoad={true} slideDuration={1500} useTranslate3D={true}/>
            </ImagesGalleryContainer>
            <DetailsRestaurantCard>
                <TitleRestaurant>{selectedRestaurant.restaurantDetails && selectedRestaurant.restaurantDetails.name}</TitleRestaurant>
                {/*TO-DO de adaugat stele in functie de rating*/}
                <Button redButton customWidth={"100%"} centerText>Reserve a table online</Button>
                <SpecificAndTypeSectionContainer withPaddingTop>
                    <Icon icon={chefHat}/>
                    {selectedRestaurant && !_.isEmpty(selectedRestaurant.listSpecifics) && selectedRestaurant.listSpecifics.map((element: any) => {
                        let index = listSpecifics.findIndex(specific => specific.id == element.specificRestaurantId)
                        return <SpecificElement noBackgroundAndMargin>{listSpecifics[index].name}</SpecificElement>
                    })}
                </SpecificAndTypeSectionContainer>
                <LocationRestaurant paddingTop><MaterialIcon
                    iconName={"location_on"}/> {fullAddress}
                </LocationRestaurant>
            </DetailsRestaurantCard>
        </ImagesGallerySection>
        <DescriptionAndMapSection>
           <DescriptionText>{selectedRestaurant && selectedRestaurant.restaurantDetails ? selectedRestaurant.restaurantDetails.description : ""}</DescriptionText>
        </DescriptionAndMapSection>
    </PageWrapper> : <LoaderComponent/>
}

export default withRouter(ViewRestaurant);