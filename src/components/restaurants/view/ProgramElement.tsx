import React from "react";
import {getDayNameByNumber} from "../../../helpers/sharedFunctions";
import {ProgramElementContainer, SectionElement, SectionName} from "./style";

type ProgramElementProps = {
    program: {
        startAt: string;
        endAt: string;
        close: boolean;
        day: number;
    }

    boldText?: boolean;
}

export const ProgramElement = ({program, boldText}: ProgramElementProps) => {
    const dayName = getDayNameByNumber(program.day)
    return <ProgramElementContainer boldText={boldText}>
        <SectionName>{dayName}:</SectionName> {!program.close ?
        <SectionElement>{program.startAt}-{program.endAt}</SectionElement> : "Close"}
    </ProgramElementContainer>
}