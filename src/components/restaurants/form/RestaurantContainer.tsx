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
import {useHistory} from "react-router-dom";
import {FullAddress} from "../../../helpers/sharedFunctions";

type RestaurantContainerValues = {
    values: any;
    listTypes: { id: string, name: string }[],
    listSpecifics: { id: string, name: string }[]
}




const RestaurantContainer = ({listSpecifics, listTypes, values}: RestaurantContainerValues) => {
    let fullAddressName = useMemo(()=>FullAddress(values),[])
    let history = useHistory();
    return <RestaurantSection key={values.restaurantDetails.id} onClick={()=>{history.push(`restaurant/${values.restaurantDetails.id}`)}}>
        <ImageRestaurant
            linkImage={`https://d2fdt3nym3n14p.cloudfront.net/venue/3094/gallery/13009/conversions/121113237_811315479645435_5054498167316426209_o-big.jpg`}/>
        <DescriptionRestaurantContainer>
            <TitleRestaurant>{values.restaurantDetails.name}</TitleRestaurant>
            <LocationRestaurant><MaterialIcon
                iconName={"location_on"}/> {fullAddressName}
            </LocationRestaurant>
            <SpecificAndTypeSectionContainer>
                <MaterialIcon
                    iconName={"paid"}/>
                {
                    values.listSpecifics && !_.isEmpty(values.listSpecifics) && values.listSpecifics.map((specific: any) => {
                       let index = listSpecifics.findIndex((item) => item.id == specific.specificRestaurantId)
                        return <SpecificElement key={specific.id}>{listSpecifics[index].name}</SpecificElement>
                    })
                }
            </SpecificAndTypeSectionContainer>
        </DescriptionRestaurantContainer>
    </RestaurantSection>
}

export default RestaurantContainer