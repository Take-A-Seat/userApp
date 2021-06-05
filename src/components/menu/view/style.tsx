import styled from "styled-components";
import {
    DARK_GREY2_COLOR,
    LIGHT_GREY_COLOR,
    SETTINGS_BACKGROUND_GREY,
    WHITE_COLOR
} from "../../../constants/styleConstants";

export const ContainerProduct = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px dotted grey;
`

export const TitleProduct = styled.span`
  font-size: 16px;
  align-self: flex-start;
  padding-bottom: 3px;
  font-weight: 500;

`
export const DescriptionProduct = styled.span`
  font-size: 13px;
  color: ${DARK_GREY2_COLOR};
  line-height: 1.3;
  ::first-letter{
    text-transform: uppercase;
  }

`

export const PageMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${WHITE_COLOR};
  align-items: center;
  width: 100%;
  margin-bottom: 35px;
  padding: 30px 0;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;

  @media only screen and (min-width: 1000px) {
      width: 65%;
  }

`