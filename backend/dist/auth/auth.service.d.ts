import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { EmployeeProfileDocument } from '../employee-profile/models/employee-profile.schema';
import { EmployeeSystemRoleDocument } from '../employee-profile/models/employee-system-role.schema';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
export declare class AuthService {
    private jwtService;
    private employeeProfileModel;
    private employeeSystemRoleModel;
    constructor(jwtService: JwtService, employeeProfileModel: Model<EmployeeProfileDocument>, employeeSystemRoleModel: Model<EmployeeSystemRoleDocument>);
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
    validateUser(userId: string, email: string): Promise<any>;
    hashPassword(password: string): Promise<string>;
    changePassword(userId: string, newPassword: string): Promise<void>;
}
