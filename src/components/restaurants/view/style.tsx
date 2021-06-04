import styled from "styled-components";
import {BLACK_COLOR, BLUE_COLOR_HYPERLINK, GREY_TEXT_COLOR, WHITE_COLOR} from "../../../constants/styleConstants";

export const ImagesGallerySection = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 1000px) {
    flex-direction: row;
  }
`
export const ImagesGalleryContainer = styled.div`
  @media only screen and (min-width: 1000px) {
    width: 50%;
  }
`

export const DetailsRestaurantCard = styled.div`
  padding: 2em 2em 1em 2em;
  display: flex;
  color: ${WHITE_COLOR};
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  @media only screen and (min-width: 1000px) {
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    width: 30em;
  }
  color: ${GREY_TEXT_COLOR};

  & i {
    color: ${BLACK_COLOR};
  }
`

export const SectionViewRestaurant = styled.div<{ program?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0 2em 5px 2em;
  color: ${GREY_TEXT_COLOR};
  @media only screen and (min-width: 1000px) {
    margin-top: 25px;
    flex-direction: row;
    margin-right: auto;
    justify-content: center;
  }
  ${({program}) => program && `
  width:100%;
  margin-top: 30px;
  
  `}
`

export const DescriptionText = styled.span`
  font-size: 14px;
  text-align: left;
  @media only screen and (min-width: 1000px) {
    padding-right: 25px;
    width: 52%;
  }
`

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 350px;

  margin-top: 15px;
  @media only screen and (min-width: 1000px) {
    width: 29.5em;
    margin-top: 0;
  }
`

export const FindLocationText = styled.a`
  display: flex;
  align-items: center;
  margin-top: 5px;
  text-decoration: none;
  color: ${BLUE_COLOR_HYPERLINK};
`

export const ProgramElementContainer = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 2px;
  font-size: 13px;
  width: 100%;
  @media only screen and (min-width: 1000px) {
    width: 100%;
  }
  ${({boldText}) => boldText && `
  font-weight:bold;
    `}

`

export const ProgramContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 320px;
  
`

export const TitleBoldProgram = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 1em;
  
`

export const DayNameProgram = styled.span`
  font-size: 13px;
`
export const ProgramHours = styled.span`
  font-size: 12px;
`

export const ContainerCharacteristics = styled.div`
  margin-top: 30px;
  @media only screen and (min-width: 1000px) {
    width: 30em;
    margin-top: 0;

  }
  
`