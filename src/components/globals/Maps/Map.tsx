import React, {useState} from "react";

import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api"
import {GOOGLE_API_KEY} from "../../../constants/globalConstants";
import {Libraries} from "@react-google-maps/api/dist/utils/make-load-script-url";
import mapStyles from "./mapStyles"
import pin from "../../../assets/food-pin-pngrepo-com.png"
import {LoaderComponent} from "../Loader/Loader";
import {FindLocationText, MapContainer} from "../../restaurants/view/style";
import MaterialIcon from "../MaterialIcons";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "400px",
}

const options = {
    styles: mapStyles,
} as google.maps.MapOptions


type MapProps = {
    lat: number;
    lng: number;
}

const Map = ({lat, lng}: MapProps) => {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: GOOGLE_API_KEY ? GOOGLE_API_KEY : "",
        libraries: libraries as Libraries,

    })

    const [userLocation, setSelected] = useState({})

    if (loadError) return <>Error loading maps</>;
    if (!isLoaded) return <LoaderComponent/>
    return <MapContainer>
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={16}
            center={{lat: lat, lng: lng}}
            options={options}
            clickableIcons={false}
        >
            <Marker position={{lat: lat, lng: lng}}
                    onClick={() => {
                        setSelected({lat: lat, lng: lng})
                    }}
                    icon={{
                        url: pin,
                        scaledSize: new window.google.maps.Size(50, 50),
                    }}/>
        </GoogleMap>

        <FindLocationText href={`https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`}
                          target="_blank"><MaterialIcon iconName={"near_me"}/> Help me find</FindLocationText>

    </MapContainer>
}

export default Map;