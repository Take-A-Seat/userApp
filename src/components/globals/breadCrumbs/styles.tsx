import styled from 'styled-components'
import {
    DARK_GREY_COLOR, NORMAL_FONT_SIZE,
    RED_COLOR_BUTTON,
    SMALL_FONT_SIZE,
    VERY_DARK_GREY_COLOR
} from "../../../constants/styleConstants";

export const BreadCrumbsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: fit-content;
  border-bottom: 1px solid ${DARK_GREY_COLOR};
  margin-bottom: 15px;
  padding-left: 5%;
  @media only screen and (min-width: 1000px) {
    margin-bottom: 15px;
  }
`;

export const BreadCrumbWrapper = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const BreadCrumbName = styled.div<any>`
  width: fit-content;
  font-size: ${NORMAL_FONT_SIZE};
  color: ${RED_COLOR_BUTTON};
  margin-right: 5px;
  margin-bottom: 0;
  cursor: pointer;
  font-weight: bold;

  ${({currentBreadCrumb}) => currentBreadCrumb && `
        color:${VERY_DARK_GREY_COLOR};
    `}
  ::first-letter {
    text-transform: uppercase;
  }
`;

export const BreadCrumbsDelimiter = styled.div`
  width: 2px;
  height: 14px;
  background: ${VERY_DARK_GREY_COLOR};
  margin: 0 10px;
`;