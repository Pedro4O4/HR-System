import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeManagementModule } from './time-management/time-management.module';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { LeavesModule } from './leaves/leaves.module';
import { PayrollConfigModule } from './payroll-config/payroll-config.module';
import { PayrollExecModule } from './payroll-exec/payroll-exec.module';
import { PayrollTrackingModule } from './payroll-tracking/payroll-tracking.module';
import { EmployeeProfileModule } from './employee-profile/employee-profile.module';
import { OrganizationStructureModule } from './organization-structure/organization-structure.module';
import { PerformanceModule } from './performance/performance.module';

@Module({
  imports: [TimeManagementModule, RecruitmentModule, LeavesModule, PayrollConfigModule, PayrollExecModule, PayrollTrackingModule, EmployeeProfileModule, OrganizationStructureModule, PerformanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
