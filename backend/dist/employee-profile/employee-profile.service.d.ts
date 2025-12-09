import { Model, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { EmployeeProfileDocument } from './models/employee-profile.schema';
import { EmployeeSystemRole, EmployeeSystemRoleDocument } from './models/employee-system-role.schema';
import { EmployeeQualification, EmployeeQualificationDocument } from './models/qualification.schema';
import { Candidate, CandidateDocument } from './models/candidate.schema';
import { EmployeeProfileChangeRequest, EmployeeProfileChangeRequestDocument } from './models/ep-change-request.schema';
import { CreateEmployeeProfileDto } from './dto/create-employee-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';
import { EmployeeProfileResponseDto } from './dto/employee-profile-response.dto';
import { CreateQualificationDto } from './dto/qualification.dto';
import { AssignRoleDto, UpdateRoleDto } from './dto/role.dto';
import { CreateCandidateDto, UpdateCandidateStatusDto, ConvertCandidateToEmployeeDto } from './dto/candidate.dto';
import { CreateChangeRequestDto } from './dto/change-request.dto';
import { NotificationService } from '../notification/notification.service';
import { PaginationQueryDto } from './dto/pagination.dto';
import { EmployeeStatus } from './enums/employee-profile.enums';
export declare class EmployeeProfileService {
    private employeeProfileModel;
    private employeeSystemRoleModel;
    private employeeQualificationModel;
    private candidateModel;
    private changeRequestModel;
    private notificationService;
    constructor(employeeProfileModel: Model<EmployeeProfileDocument>, employeeSystemRoleModel: Model<EmployeeSystemRoleDocument>, employeeQualificationModel: Model<EmployeeQualificationDocument>, candidateModel: Model<CandidateDocument>, changeRequestModel: Model<EmployeeProfileChangeRequestDocument>, notificationService: NotificationService);
    private isValidObjectId;
    create(createEmployeeProfileDto: CreateEmployeeProfileDto): Promise<EmployeeProfileResponseDto>;
    findAll(skip?: number, limit?: number, status?: EmployeeStatus): Promise<{
        data: EmployeeProfileResponseDto[];
        total: number;
        skip: number;
        limit: number;
    }>;
    findById(id: string): Promise<EmployeeProfileResponseDto>;
    findByEmail(email: string): Promise<EmployeeProfileResponseDto>;
    findByEmployeeNumber(employeeNumber: string): Promise<EmployeeProfileResponseDto>;
    update(id: string, updateEmployeeProfileDto: UpdateEmployeeProfileDto): Promise<EmployeeProfileResponseDto>;
    delete(id: string): Promise<{
        message: string;
    }>;
    getTeam(managerId: string, skip?: number, limit?: number): Promise<{
        data: EmployeeProfileResponseDto[];
        total: number;
    }>;
    updateStatus(id: string, status: EmployeeStatus): Promise<EmployeeProfileResponseDto>;
    updateContactInfo(id: string, updateDto: any): Promise<EmployeeProfileResponseDto>;
    uploadProfilePicture(id: string, file: Express.Multer.File): Promise<EmployeeProfileResponseDto>;
    addQualification(employeeId: string, createDto: CreateQualificationDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, EmployeeQualification, {}, {}> & EmployeeQualification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & mongoose.Document<unknown, {}, EmployeeQualification, {}, {}> & EmployeeQualification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getQualifications(employeeId: string): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, EmployeeQualification, {}, {}> & EmployeeQualification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & mongoose.Document<unknown, {}, EmployeeQualification, {}, {}> & EmployeeQualification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    assignRoles(employeeId: string, assignDto: AssignRoleDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, EmployeeSystemRole, {}, {}> & EmployeeSystemRole & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & mongoose.Document<unknown, {}, EmployeeSystemRole, {}, {}> & EmployeeSystemRole & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getEmployeeRoles(employeeId: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, EmployeeSystemRole, {}, {}> & EmployeeSystemRole & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & mongoose.Document<unknown, {}, EmployeeSystemRole, {}, {}> & EmployeeSystemRole & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getAllRoles(): Promise<any[]>;
    updateRoles(employeeId: string, updateDto: UpdateRoleDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, EmployeeSystemRole, {}, {}> & EmployeeSystemRole & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & mongoose.Document<unknown, {}, EmployeeSystemRole, {}, {}> & EmployeeSystemRole & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    deactivateRoles(employeeId: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, EmployeeSystemRole, {}, {}> & EmployeeSystemRole & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & mongoose.Document<unknown, {}, EmployeeSystemRole, {}, {}> & EmployeeSystemRole & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    createCandidate(createDto: CreateCandidateDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Candidate, {}, {}> & Candidate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & mongoose.Document<unknown, {}, Candidate, {}, {}> & Candidate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getAllCandidates(queryDto: PaginationQueryDto): Promise<{
        data: (mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Candidate, {}, {}> & Candidate & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & mongoose.Document<unknown, {}, Candidate, {}, {}> & Candidate & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getCandidateById(id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Candidate, {}, {}> & Candidate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & mongoose.Document<unknown, {}, Candidate, {}, {}> & Candidate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    updateCandidateStatus(candidateId: string, updateDto: UpdateCandidateStatusDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Candidate, {}, {}> & Candidate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & mongoose.Document<unknown, {}, Candidate, {}, {}> & Candidate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    convertCandidateToEmployee(candidateId: string, convertDto: ConvertCandidateToEmployeeDto): Promise<EmployeeProfileResponseDto>;
    createChangeRequest(employeeId: string, createDto: CreateChangeRequestDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & mongoose.Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getAllChangeRequests(queryDto: PaginationQueryDto): Promise<{
        data: (mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & mongoose.Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
        page: number;
        limit: number;
        total: number;
        pages: number;
    }>;
    approveChangeRequest(requestId: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & mongoose.Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    rejectChangeRequest(requestId: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & mongoose.Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getChangeRequestById(requestId: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & mongoose.Document<unknown, {}, EmployeeProfileChangeRequest, {}, {}> & EmployeeProfileChangeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    deactivateEmployee(id: string, status: EmployeeStatus): Promise<EmployeeProfileResponseDto>;
    createEmployeeProfile(createDto: CreateEmployeeProfileDto): Promise<EmployeeProfileResponseDto>;
    getAllEmployees(queryDto: PaginationQueryDto): Promise<{
        data: EmployeeProfileResponseDto[];
        page: number;
        limit: number;
        total: number;
        pages: number;
    }>;
    getEmployeeById(id: string): Promise<EmployeeProfileResponseDto>;
    updateEmployeeProfile(id: string, updateDto: UpdateEmployeeProfileDto): Promise<EmployeeProfileResponseDto>;
    exportEmployeeProfileToPdf(id: string): Promise<Buffer>;
    exportEmployeesToCsv(): Promise<string>;
    private mapToResponseDto;
}
