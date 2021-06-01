import React from "react";
import "./style"
import {History} from "history";
import {withRouter} from "react-router-dom";
import {HeaderWrapper, LogoWrapper} from "./style";
import Logo from "../../../assets/Asset 5 (1).svg"

const Header = ({history}: { history: History }) => {


    return (
        <HeaderWrapper>
            <LogoWrapper onClick={() => {
                history.push("/")
            }}>
                <img src={Logo} alt={"Logo"}/>
            </LogoWrapper>
        </HeaderWrapper>
    )
}

export default withRouter(Header)