/**
 * Seed script for Payroll Tracking Data
 * 
 * Run with: npx ts-node --transpile-only src/payroll-tracking/scripts/seed-payroll-tracking.ts
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

interface RunData {
    runName: string;
    runDate: Date;
    status: string;
    processedBy: Types.ObjectId;
}

interface PayslipData {
    employeeId: Types.ObjectId;
    payrollRunId: Types.ObjectId;
    earningsDetails: {
        baseSalary: number;
        allowances: { name: string; amount: number; frequency: string }[];
        bonuses: { name: string; amount: number }[];
    };
    deductionsDetails: {
        taxes: { name: string; percentage: number; amount: number }[];
        insurances: { name: string; amount: number; percentage?: number }[];
    };
    totalGrossSalary: number;
    totalDeductions: number;
    netPay: number;
    paymentStatus: string;
}

async function seedPayrollTrackingData() {
    const app = await NestFactory.createApplicationContext(AppModule);

    // Get models
    const claimsModel: any = app.get(getModelToken('claims'));
    const disputesModel: any = app.get(getModelToken('disputes'));
    const paySlipModel: any = app.get(getModelToken('paySlip'));
    const employeeModel: any = app.get(getModelToken('EmployeeProfile'));
    const payrollRunsModel: any = app.get(getModelToken('payrollRuns'));

    console.log('🚀 Starting Payroll Tracking Data Seed...\n');

    try {
        // Get first employee for seeding
        const employees = await employeeModel.find().limit(5).exec();

        if (employees.length === 0) {
            console.log('⚠️  No employees found. Please seed employee data first.');
            console.log('   Creating sample data with dummy employee IDs...\n');
        }

        const employeeIds = employees.length > 0
            ? employees.map((e: any) => e._id)
            : [new Types.ObjectId(), new Types.ObjectId()];

        const primaryEmployeeId = employeeIds[0];
        console.log(`👤 Using employee ID: ${primaryEmployeeId}\n`);

        // Check if payroll runs exist
        let payrollRuns = await payrollRunsModel.find().limit(12).exec();

        if (payrollRuns.length === 0) {
            console.log('📅 Creating sample payroll runs...');
            const currentDate = new Date();
            const runData: RunData[] = [];

            for (let i = 0; i < 12; i++) {
                const runDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                runData.push({
                    runName: `${runDate.toLocaleString('default', { month: 'long' })} ${runDate.getFullYear()} Payroll`,
                    runDate: runDate,
                    status: 'completed',
                    processedBy: primaryEmployeeId,
                });
            }

            payrollRuns = await payrollRunsModel.insertMany(runData);
            console.log(`   ✅ Created ${payrollRuns.length} payroll runs\n`);
        }

        // ========================================
        // SEED PAYSLIPS (12 months)
        // ========================================
        console.log('💵 Seeding Payslips...');

        // Clear existing payslips for this employee
        await paySlipModel.deleteMany({ employeeId: primaryEmployeeId });

        const payslipsData: PayslipData[] = [];
        const baseSalary = 75000;
        const monthlyBase = baseSalary / 12;

        for (let i = 0; i < 12; i++) {
            const overtime = Math.random() > 0.6 ? Math.floor(Math.random() * 800) : 0;
            const transportAllowance = 350;
            const mealAllowance = 200;
            const housingAllowance = 1500;

            const totalEarnings = monthlyBase + transportAllowance + mealAllowance + housingAllowance + overtime;

            const incomeTax = totalEarnings * 0.22;
            const socialSecurity = totalEarnings * 0.062;
            const healthInsurance = 450;
            const retirement401k = monthlyBase * 0.06;

            const totalDeductions = incomeTax + socialSecurity + healthInsurance + retirement401k;
            const netPay = totalEarnings - totalDeductions;

            payslipsData.push({
                employeeId: primaryEmployeeId,
                payrollRunId: payrollRuns[i % payrollRuns.length]._id,
                earningsDetails: {
                    baseSalary: Math.round(monthlyBase),
                    allowances: [
                        { name: 'Transport Allowance', amount: transportAllowance, frequency: 'monthly' },
                        { name: 'Meal Allowance', amount: mealAllowance, frequency: 'monthly' },
                        { name: 'Housing Allowance', amount: housingAllowance, frequency: 'monthly' },
                    ],
                    bonuses: overtime > 0 ? [{ name: 'Overtime Pay', amount: overtime }] : [],
                },
                deductionsDetails: {
                    taxes: [
                        { name: 'Federal Income Tax', percentage: 22, amount: Math.round(incomeTax) },
                    ],
                    insurances: [
                        { name: 'Health Insurance', amount: healthInsurance },
                        { name: 'Social Security', percentage: 6.2, amount: Math.round(socialSecurity) },
                    ],
                },
                totalGrossSalary: Math.round(totalEarnings),
                totalDeductions: Math.round(totalDeductions),
                netPay: Math.round(netPay),
                paymentStatus: 'paid',
            });
        }

        const insertedPayslips = await paySlipModel.insertMany(payslipsData);
        console.log(`   ✅ Created ${insertedPayslips.length} payslips\n`);

        // ========================================
        // SEED CLAIMS
        // ========================================
        console.log('📋 Seeding Claims...');

        await claimsModel.deleteMany({ employeeId: primaryEmployeeId });

        const claimsData = [
            {
                claimId: 'CLAIM-2026-001',
                description: 'Medical expenses for annual health checkup and preventive care visit at City Hospital',
                claimType: 'Medical',
                employeeId: primaryEmployeeId,
                amount: 450.00,
                status: 'approved',
                approvedAmount: 450.00,
                resolutionComment: 'Claim approved as per company medical policy.',
            },
            {
                claimId: 'CLAIM-2026-002',
                description: 'Travel expenses for client meeting in Chicago - flight, hotel, and meals',
                claimType: 'Travel',
                employeeId: primaryEmployeeId,
                amount: 1250.00,
                status: 'under review',
            },
            {
                claimId: 'CLAIM-2026-003',
                description: 'Work from home equipment - ergonomic chair and standing desk converter',
                claimType: 'Equipment',
                employeeId: primaryEmployeeId,
                amount: 680.00,
                status: 'pending payroll Manager approval',
            },
            {
                claimId: 'CLAIM-2026-004',
                description: 'Professional development course - AWS Solutions Architect certification',
                claimType: 'Training',
                employeeId: primaryEmployeeId,
                amount: 350.00,
                status: 'approved',
                approvedAmount: 350.00,
                resolutionComment: 'Educational expense approved under professional development policy.',
            },
            {
                claimId: 'CLAIM-2025-015',
                description: 'Prescription glasses for computer work as recommended by optometrist',
                claimType: 'Medical',
                employeeId: primaryEmployeeId,
                amount: 320.00,
                status: 'rejected',
                rejectionReason: 'Claim exceeds the annual vision allowance limit.',
            },
            {
                claimId: 'CLAIM-2026-005',
                description: 'Mobile phone upgrade for work communication purposes',
                claimType: 'Equipment',
                employeeId: primaryEmployeeId,
                amount: 899.00,
                status: 'under review',
            },
            {
                claimId: 'CLAIM-2025-012',
                description: 'Parking expenses for Q4 2025 - downtown office location',
                claimType: 'Transport',
                employeeId: primaryEmployeeId,
                amount: 540.00,
                status: 'approved',
                approvedAmount: 540.00,
                resolutionComment: 'Parking reimbursement approved.',
            },
        ];

        const insertedClaims = await claimsModel.insertMany(claimsData);
        console.log(`   ✅ Created ${insertedClaims.length} claims\n`);

        // ========================================
        // SEED DISPUTES
        // ========================================
        console.log('⚠️  Seeding Disputes...');

        await disputesModel.deleteMany({ employeeId: primaryEmployeeId });

        const payslipIds = insertedPayslips.map((p: any) => p._id);

        const disputesData = [
            {
                disputeId: 'DISP-2025-001',
                description: 'Overtime hours from October 2025 were not included in the November payslip. Worked 12 extra hours on project deadline.',
                employeeId: primaryEmployeeId,
                payslipId: payslipIds[1] || new Types.ObjectId(),
                status: 'approved',
                resolutionComment: 'Overtime verified with time tracking. $360 will be added to next payroll.',
            },
            {
                disputeId: 'DISP-2025-002',
                description: 'Transport allowance incorrectly calculated in December payslip. Should be $350 but received $280.',
                employeeId: primaryEmployeeId,
                payslipId: payslipIds[0] || new Types.ObjectId(),
                status: 'rejected',
                rejectionReason: 'Transport allowance was correctly calculated based on updated work-from-home schedule.',
            },
        ];

        const insertedDisputes = await disputesModel.insertMany(disputesData);
        console.log(`   ✅ Created ${insertedDisputes.length} disputes\n`);

        // Summary
        console.log('━'.repeat(50));
        console.log('📊 SEED SUMMARY');
        console.log('━'.repeat(50));
        console.log(`   Payslips:  ${insertedPayslips.length} records`);
        console.log(`   Claims:    ${insertedClaims.length} records`);
        console.log(`   Disputes:  ${insertedDisputes.length} records`);
        console.log('\n✅ Payroll tracking data seeded successfully!');

    } catch (error) {
        console.error('❌ Error seeding data:', error);
    } finally {
        await app.close();
    }
}

seedPayrollTrackingData();
