import React from "react";
import {getDayNameByNumber} from "../../../helpers/sharedFunctions";
import {DayNameProgram, ProgramElementContainer, ProgramHours} from "./style";

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
       <DayNameProgram>{dayName}:</DayNameProgram> {!program.close?<ProgramHours>{program.startAt}-{program.endAt}</ProgramHours>:"Close"}
    </ProgramElementContainer>
}