import { Types } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { TimeExceptionType, TimeExceptionStatus } from "./enums/index";

export type TimeExceptionDocument = HydratedDocument<TimeException>;

@Schema()
export class TimeException{
    @Prop({required: true})
    employeeId: string; // refrence employee id in the integration part

    @Prop({enum: TimeExceptionType, required: true})
    type: TimeExceptionType;

    @Prop({type: Types.ObjectId, ref: 'AttendanceRecord', required: true})
    attendanceRecordId: Types.ObjectId;

    @Prop({required: true})// reference employee id in the integration part
    assignedTo: string; // person responsible for handling the exception

    @Prop({ enum: TimeExceptionStatus, default: TimeExceptionStatus.OPEN })
    status: TimeExceptionStatus;

    @Prop()
    reason?: string;
}

export const TimeExceptionSchema = SchemaFactory.createForClass(TimeException);
