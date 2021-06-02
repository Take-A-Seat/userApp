import styled from "styled-components";
import {BLACK_COLOR, GREY_TEXT_COLOR, WHITE_COLOR} from "../../../constants/styleConstants";

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

export const DescriptionAndMapSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2em  5px 2em;
  color: ${GREY_TEXT_COLOR};
  @media only screen and (min-width: 1000px) {
    flex-direction: row;
  }
`

export const DescriptionText = styled.span`
  font-size: 14px;
  text-align: left;
  width: 100%;
  @media only screen and (min-width: 1000px) {
    width: 30%;
`
