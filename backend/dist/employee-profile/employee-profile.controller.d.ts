import type { Response } from 'express';
import { EmployeeProfileService } from './employee-profile.service';
import { PaginationQueryDto } from './dto/pagination.dto';
import { CreateEmployeeProfileDto } from './dto/create-employee-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';
import { CreateQualificationDto } from './dto/qualification.dto';
import { AssignRoleDto, UpdateRoleDto } from './dto/role.dto';
import { CreateCandidateDto, UpdateCandidateStatusDto, ConvertCandidateToEmployeeDto } from './dto/candidate.dto';
import { CreateChangeRequestDto } from './dto/change-request.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
export declare class EmployeeProfileController {
    private readonly employeeProfileService;
    constructor(employeeProfileService: EmployeeProfileService);
    getAllEmployees(query: PaginationQueryDto): Promise<{
        data: import("./dto/employee-profile-response.dto").EmployeeProfileResponseDto[];
        page: number;
        limit: number;
        total: number;
        pages: number;
    }>;
    getProfile(req: any): Promise<import("./dto/employee-profile-response.dto").EmployeeProfileResponseDto>;
    createEmployee(createDto: CreateEmployeeProfileDto): Promise<import("./dto/employee-profile-response.dto").EmployeeProfileResponseDto>;
    exportEmployeesToCsv(res: Response): Promise<void>;
    getAllCandidates(query: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/candidate.schema").Candidate, {}, {}> & import("./models/candidate.schema").Candidate & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/candidate.schema").Candidate, {}, {}> & import("./models/candidate.schema").Candidate & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    createCandidate(createDto: CreateCandidateDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/candidate.schema").Candidate, {}, {}> & import("./models/candidate.schema").Candidate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/candidate.schema").Candidate, {}, {}> & import("./models/candidate.schema").Candidate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getCandidateById(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/candidate.schema").Candidate, {}, {}> & import("./models/candidate.schema").Candidate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/candidate.schema").Candidate, {}, {}> & import("./models/candidate.schema").Candidate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    convertCandidateToEmployee(id: string, convertDto: ConvertCandidateToEmployeeDto): Promise<import("./dto/employee-profile-response.dto").EmployeeProfileResponseDto>;
    updateCandidateStatus(id: string, updateDto: UpdateCandidateStatusDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/candidate.schema").Candidate, {}, {}> & import("./models/candidate.schema").Candidate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/candidate.schema").Candidate, {}, {}> & import("./models/candidate.schema").Candidate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAllChangeRequests(query: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/ep-change-request.schema").EmployeeProfileChangeRequest, {}, {}> & import("./models/ep-change-request.schema").EmployeeProfileChangeRequest & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/ep-change-request.schema").EmployeeProfileChangeRequest, {}, {}> & import("./models/ep-change-request.schema").EmployeeProfileChangeRequest & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        page: number;
        limit: number;
        total: number;
        pages: number;
    }>;
    createChangeRequest(req: any, createDto: CreateChangeRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/ep-change-request.schema").EmployeeProfileChangeRequest, {}, {}> & import("./models/ep-change-request.schema").EmployeeProfileChangeRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/ep-change-request.schema").EmployeeProfileChangeRequest, {}, {}> & import("./models/ep-change-request.schema").EmployeeProfileChangeRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    approveChangeRequest(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/ep-change-request.schema").EmployeeProfileChangeRequest, {}, {}> & import("./models/ep-change-request.schema").EmployeeProfileChangeRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/ep-change-request.schema").EmployeeProfileChangeRequest, {}, {}> & import("./models/ep-change-request.schema").EmployeeProfileChangeRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    rejectChangeRequest(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/ep-change-request.schema").EmployeeProfileChangeRequest, {}, {}> & import("./models/ep-change-request.schema").EmployeeProfileChangeRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/ep-change-request.schema").EmployeeProfileChangeRequest, {}, {}> & import("./models/ep-change-request.schema").EmployeeProfileChangeRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateContactInfo(id: string, updateDto: UpdateContactInfoDto, req: any): Promise<import("./dto/employee-profile-response.dto").EmployeeProfileResponseDto>;
    uploadProfilePicture(id: string, file: Express.Multer.File, req: any): Promise<import("./dto/employee-profile-response.dto").EmployeeProfileResponseDto>;
    getQualifications(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/qualification.schema").EmployeeQualification, {}, {}> & import("./models/qualification.schema").EmployeeQualification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/qualification.schema").EmployeeQualification, {}, {}> & import("./models/qualification.schema").EmployeeQualification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    addQualification(id: string, createDto: CreateQualificationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/qualification.schema").EmployeeQualification, {}, {}> & import("./models/qualification.schema").EmployeeQualification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/qualification.schema").EmployeeQualification, {}, {}> & import("./models/qualification.schema").EmployeeQualification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAllRoles(): Promise<any[]>;
    getEmployeeRoles(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/employee-system-role.schema").EmployeeSystemRole, {}, {}> & import("./models/employee-system-role.schema").EmployeeSystemRole & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/employee-system-role.schema").EmployeeSystemRole, {}, {}> & import("./models/employee-system-role.schema").EmployeeSystemRole & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    assignRoles(id: string, assignDto: AssignRoleDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/employee-system-role.schema").EmployeeSystemRole, {}, {}> & import("./models/employee-system-role.schema").EmployeeSystemRole & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/employee-system-role.schema").EmployeeSystemRole, {}, {}> & import("./models/employee-system-role.schema").EmployeeSystemRole & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateRoles(id: string, updateDto: UpdateRoleDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/employee-system-role.schema").EmployeeSystemRole, {}, {}> & import("./models/employee-system-role.schema").EmployeeSystemRole & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/employee-system-role.schema").EmployeeSystemRole, {}, {}> & import("./models/employee-system-role.schema").EmployeeSystemRole & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    deactivateRoles(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/employee-system-role.schema").EmployeeSystemRole, {}, {}> & import("./models/employee-system-role.schema").EmployeeSystemRole & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/employee-system-role.schema").EmployeeSystemRole, {}, {}> & import("./models/employee-system-role.schema").EmployeeSystemRole & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    exportEmployeePdf(id: string, res: Response): Promise<void>;
    updateEmployee(id: string, updateDto: UpdateEmployeeProfileDto): Promise<import("./dto/employee-profile-response.dto").EmployeeProfileResponseDto>;
    deactivateEmployee(id: string, body: {
        status: string;
    }): Promise<import("./dto/employee-profile-response.dto").EmployeeProfileResponseDto>;
    getEmployeeById(id: string): Promise<import("./dto/employee-profile-response.dto").EmployeeProfileResponseDto>;
}
