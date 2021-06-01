import React, {useMemo} from "react";
import {
    DescriptionRestaurantContainer,
    ImageRestaurant,
    LocationRestaurant,
    RestaurantSection,
    SpecificAndTypeSectionContainer,
    SpecificElement,
    TitleRestaurant
} from "../../globals/GlobalStyles";
import MaterialIcon from "../../globals/MaterialIcons";
import _ from "lodash";

type RestaurantContainerValues = {
    values: any;
    listTypes: { id: string, name: string }[],
    listSpecifics: { id: string, name: string }[]
}

const FullAddress = (values: any) => useMemo(() => {
    return `${values.restaurantDetails.address},${values.restaurantDetails.city}`
}, [values])


const RestaurantContainer = ({listSpecifics, listTypes, values}: RestaurantContainerValues) => {
    let fullAddressName = FullAddress(values)
    return <RestaurantSection>
        <ImageRestaurant
            linkImage={"https://d2fdt3nym3n14p.cloudfront.net/venue/3094/gallery/13009/conversions/121113237_811315479645435_5054498167316426209_o-big.jpg"}/>
        <DescriptionRestaurantContainer>
            <TitleRestaurant>{values.restaurantDetails.name}</TitleRestaurant>
            <LocationRestaurant><MaterialIcon
                iconName={"location_on"}/> {fullAddressName}
            </LocationRestaurant>
            <SpecificAndTypeSectionContainer>
                <MaterialIcon
                    iconName={"paid"}/>
                {
                    values.listSpecifics && !_.isEmpty(values.listSpecifics) && values.listSpecifics.map((specific: any, index: number) => {
                        index = listSpecifics.findIndex((item) => item.id == specific.specificRestaurantId)
                        return <SpecificElement>{listSpecifics[index].name}</SpecificElement>
                    })
                }
            </SpecificAndTypeSectionContainer>
        </DescriptionRestaurantContainer>
    </RestaurantSection>
}

export default RestaurantContainer