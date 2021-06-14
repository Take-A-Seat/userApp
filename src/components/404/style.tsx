import styled from "styled-components";
import {BLUE_COLOR, RED_COLOR_BUTTON, SETTINGS_BACKGROUND_GREY} from "../../constants/styleConstants";

export const RowContainer = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  ${({row}) => row && `
  flex-direction:row!important;
  `}
`


export const VeryBigTitle = styled.span<any>`
  font-size: 90px;
  font-weight: bold;
  color: black;
  white-space: nowrap;
  @media only screen and (max-width: 600px) {
    font-size: 45px;
  }
  ${({red}) => red && `
  color:${RED_COLOR_BUTTON};
  margin-right:12px;
  `}
`
export const ColumnText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding:10px 10px;
`

export const SmallText = styled.span<any>`
  padding:10px 10px;
  font-size: 22px;
  font-weight: 500;
  color :${SETTINGS_BACKGROUND_GREY};
  @media only screen and (max-width: 600px) {
    font-size: 16px;
  }
`