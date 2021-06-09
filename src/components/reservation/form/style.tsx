import React from "react";
import styled from "styled-components";
import {GREY_TEXT_COLOR, LIGHT_GREY_COLOR, RED_COLOR_BUTTON, WHITE_COLOR} from "../../../constants/styleConstants";

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

