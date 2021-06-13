import styled from "styled-components";
import {GREY_TEXT_COLOR} from "../../../constants/styleConstants";

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  
  & i {
    padding-right: 5px;
  }
`

export const TextDetail = styled.p`
  font-size: 15px;
  color: ${GREY_TEXT_COLOR};
`

export const AbsoluteContainer = styled.div`
  width: 50%;
  cursor: pointer;
  height: fit-content;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 50%;
    height: auto;
  }

  //@media only screen and (max-width: 450px) {
  //  width: 50%;
  //  height: 0;
  //  position: relative;
  //
  //  & img {
  //    top: -12px;
  //    right: 0;
  //  }
  //}
`
