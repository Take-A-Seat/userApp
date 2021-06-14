import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {
    BIG_FONT_SIZE,
    BIGGER_FONT_SIZE,
    DARK_GREY_COLOR,
    HEADER_SETTINGS_BACKGROUND,
    ORANGE_COLOR,
    VERY_DARK_GREY_COLOR
} from "../../../constants/styleConstants";

export const HeaderWrapper = styled.div<any>`
  min-height: 55px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px 30px 5px 30px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
  z-index: 10000;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  border: 1px solid rgba(40, 44, 52, 0.21);
  background-color: #fff;
  @media only screen and (max-width: 450px) {
    padding: 5px 0 5px 5px;
  }

  ${({settings}) => settings && `
  padding: 0;
  background-color:${HEADER_SETTINGS_BACKGROUND};
  justify-content:center;
  `}

  ${({area}) => area && `
  background-color :#323232;
  border:1px solid black;
  `}

  ${({table}) => table && `
  padding:10px;
  `}
`;

export const LogoWrapper = styled.div<any>`
  width: fit-content;
  cursor: pointer;
  height: fit-content;
  position: relative;

  & img {
    width: 80%;
    height: auto;
  }

  @media only screen and (max-width: 450px) {
    width: 50%;
    height: 0;
    position: relative;

    & img {
      position: absolute;
      top: -12px;
      left: 0;
    }
  }
  ${({noAbsolute}) => noAbsolute && `
    position: relative;
     width: fit-content;
    height: auto!important;
    & img {
      position: sticky;
    }
  `}

`;

export const HeaderLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: auto;
  color: #fff;
`
export const HeaderAccountSection = styled.div`
  display: flex;
  justify-content: flex-end;
  width: auto;
  align-items: center;
  color: #fff;
  @media only screen and (max-width: 600px) {
    width: auto;
  }
`

export const HeaderElement = styled(NavLink)`
  //width: 100%;
  //height: fit-content;
  padding-left: 25px;
  padding-right: 25px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: rgba(239, 244, 255, 0.42);
  font-weight: 700;

  &.active, &.hover {
    background-color: #242424;
    font-weight: 700;
    color: #fff;
  }
`

export const HeaderElementSettings = styled(NavLink)`
  //width: 100%;
  //height: fit-content;
  padding-left: 25px;
  padding-right: 25px;
  //display: flex;
  //align-items: center;
  text-decoration: none;
  color: rgba(239, 244, 255, 0.42);
  font-weight: 700;

  &.active, &.hover {
    background-color: #242424;
    font-weight: 700;
    color: #fff;
  }
`


export const HeaderElementText = styled.p<any>`
  white-space: nowrap;

  &:hover {
    background-color: #242424;
    font-weight: 700;
    color: #fff;
  }

  ${({settings}) => settings && `
    font-size:14px;
  `}

`
export const HeaderText = styled.p <any>`
  font-size: ${BIG_FONT_SIZE};
  color: ${VERY_DARK_GREY_COLOR};

  ${({name}) => name && `
        margin-left:auto;
        margin-right:5px;
        cursor:pointer;
    `}
  & i {
    font-size: ${BIGGER_FONT_SIZE};
    color: ${DARK_GREY_COLOR};
  }

  ${({logout}) => logout && `
        color:${ORANGE_COLOR};
        cursor:pointer;
     `}
`;

