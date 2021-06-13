import React from "react";
import styled from "styled-components";
import {
  DARK_GREY2_COLOR,
  GREY_TEXT_COLOR, HEADER_SETTINGS_BACKGROUND,
  LIGHT_GREY_COLOR,
  RED_COLOR_BUTTON,
  SETTINGS_BACKGROUND_GREY, VERY_DARK_GREY_COLOR,
  WHITE_COLOR
} from "../../../constants/styleConstants";

export const ElementAvailableReservation = styled.div<{ selected: boolean, numberElement?: boolean }>`
  color: ${GREY_TEXT_COLOR};
  padding: 14px 18px;
  background-color: ${WHITE_COLOR};
  height: 100%;
  margin: 5px 8px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid ${LIGHT_GREY_COLOR};
  ${({selected}) => selected && `
    background-color: ${RED_COLOR_BUTTON};
    color: ${WHITE_COLOR};
    font-weight:500;
  `}

  ${({numberElement}) => numberElement && `
    padding:15px 21px;
  `}
`

export const ContainerHorizontal = styled.div<any>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 5px 5px;
  margin-bottom: 5px;
  margin-top: 5px;
  ${({noPadding})=> noPadding &&`
    padding:0;
  `}
`
export const TitleReservation = styled.p`
  font-size: 15px;
  font-weight: 400;
`

export const ContainerFields = styled.div`
  width: 100%;
  padding: 0 20px;
  @media only screen and (min-width: 1000px) {
    width: 80%;
  }
  @media only screen and (min-width: 1400px) {
    width: 65%;
  }
  @media only screen and (min-width: 1650px) {
    width: 50%;
  }
`

export const ArrivedText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${WHITE_COLOR};
`

export const ContainerManageReservation = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 25px 15px;
  border: 1px solid ${SETTINGS_BACKGROUND_GREY};
  border-radius: 6px;
  overflow-y: scroll;
  overflow-y: -moz-scrollbars-vertical;
  height: 575px;
    // background-color: ${HEADER_SETTINGS_BACKGROUND};
  @media only screen and (max-width: 600px) {
    padding: 25px 0;
  }
`

export const ContainerMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 54%;
  justify-content: center;
  @media only screen and (max-width: 950px) {
    width: 98%;
  }
`
export const ContainerListProducts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  min-width: 250px;
  position: sticky;
  top: 0;
  @media only screen and (max-width: 950px) {
    width: 98%;
  }
`

export const ContainerProduct = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px dotted grey;
`

export const TitleProduct = styled.span`
  font-size: 16px;
  align-self: flex-start;
  padding-bottom: 3px;
  font-weight: 500;
  color: ${WHITE_COLOR};
`
export const DescriptionProduct = styled.span`
  font-size: 13px;
  color: ${DARK_GREY2_COLOR};
  line-height: 1.3;
  padding-right: 5px;

  ::first-letter {
    text-transform: uppercase;
  }

`

export const PageMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${SETTINGS_BACKGROUND_GREY};
  align-items: center;
  width: 100%;
  margin-bottom: 25px;
  padding: 10px 0;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  border: 1px solid ${VERY_DARK_GREY_COLOR};

  @media only screen and (min-width: 1000px) {
    width: 100%;
  }

`

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const RowContainerNoJustify = styled.div<any>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  ${({marginTop})=>marginTop && `
  margin-top:${marginTop};
  `}
`

export const Product = styled.span<any>`
  color: ${WHITE_COLOR};
  font-size: 13px;
  ${({customWidth}) => customWidth && `
  width:${customWidth};
  `}
`
export const ProductContainerListing = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  padding: 10px 0;
`

export const ContainerTotal =styled.div`
margin-left: auto;
  font-size: 16px;
  padding-right: 10px;
  font-weight: 600;
  color: ${LIGHT_GREY_COLOR};
`


