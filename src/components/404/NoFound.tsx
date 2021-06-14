import React from "react";
import NoFoundSVG from "../../assets/Group 33.svg";
import {LogoWrapper} from "../globals/header/style";
import {ColumnText, RowContainer, SmallText, VeryBigTitle} from "./style";
import {ColumnContainer} from "../globals/formComponents/style";
import {Button} from "../globals/GlobalStyles";
import {useHistory} from "react-router-dom";


export const NoFoundPage = () => {
    let history = useHistory();
    return <>
        <RowContainer>
            <LogoWrapper noAbsolute>
                <img src={NoFoundSVG} alt={"Logo"}/>
            </LogoWrapper>
            <ColumnContainer>
                <ColumnText>
                    <VeryBigTitle>Oops,<br/></VeryBigTitle>
                    <RowContainer row><VeryBigTitle red>nothing </VeryBigTitle>
                        <VeryBigTitle> here...</VeryBigTitle></RowContainer>
                </ColumnText>

                <SmallText>
                    Uh oh, we can't seem to find the page you're looking for.
                    Try going back to previous page or Contact us for more information.
                </SmallText>

                <Button redButton
                        customWidth={"180px"}
                        customMarginRight={"0"}
                        alignedLeft
                        customMarginLeft={"10px"}
                        centerText onClick={()=>{history.push("/")}}>Go homepage</Button>


            </ColumnContainer>
        </RowContainer>
    </>
}