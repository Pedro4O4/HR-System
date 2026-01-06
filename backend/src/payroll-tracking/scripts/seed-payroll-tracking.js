/**
 * Seed script for Payroll Tracking Data via REST API
 * 
 * Run with: node src/payroll-tracking/scripts/seed-payroll-tracking.js
 * 
 * Make sure the backend is running on port 3000
 */

const API_BASE = 'http://localhost:3000';

async function seedPayrollTrackingData() {
    console.log('🚀 Starting Payroll Tracking Data Seed...\n');

    try {
        // Get employees first
        console.log('👤 Fetching employees...');
        let employees;
        try {
            const empResponse = await fetch(`${API_BASE}/employee-profile`);
            employees = await empResponse.json();
            console.log(`   Found ${employees.length} employees\n`);
        } catch (e) {
            console.log('   ⚠️  Could not fetch employees, using dummy IDs\n');
            employees = [];
        }

        const employeeId = employees[0]?._id || '507f1f77bcf86cd799439011';
        console.log(`   Using employee ID: ${employeeId}\n`);

        // ========================================
        // SEED CLAIMS
        // ========================================
        console.log('📋 Seeding Claims...');

        const claimsData = [
            {
                claimId: `CLAIM-2026-${Date.now().toString().slice(-4)}-001`,
                description: 'Medical expenses for annual health checkup and preventive care visit at City Hospital',
                claimType: 'Medical',
                employeeId: employeeId,
                amount: 450.00,
            },
            {
                claimId: `CLAIM-2026-${Date.now().toString().slice(-4)}-002`,
                description: 'Travel expenses for client meeting in Chicago - flight, hotel, and meals',
                claimType: 'Travel',
                employeeId: employeeId,
                amount: 1250.00,
            },
            {
                claimId: `CLAIM-2026-${Date.now().toString().slice(-4)}-003`,
                description: 'Work from home equipment - ergonomic chair and standing desk converter',
                claimType: 'Equipment',
                employeeId: employeeId,
                amount: 680.00,
            },
            {
                claimId: `CLAIM-2026-${Date.now().toString().slice(-4)}-004`,
                description: 'Professional development course - AWS Solutions Architect certification',
                claimType: 'Training',
                employeeId: employeeId,
                amount: 350.00,
            },
            {
                claimId: `CLAIM-2025-${Date.now().toString().slice(-4)}-015`,
                description: 'Prescription glasses for computer work as recommended by optometrist',
                claimType: 'Medical',
                employeeId: employeeId,
                amount: 320.00,
            },
            {
                claimId: `CLAIM-2026-${Date.now().toString().slice(-4)}-005`,
                description: 'Mobile phone upgrade for work communication purposes',
                claimType: 'Equipment',
                employeeId: employeeId,
                amount: 899.00,
            },
            {
                claimId: `CLAIM-2025-${Date.now().toString().slice(-4)}-012`,
                description: 'Parking expenses for Q4 2025 - downtown office location',
                claimType: 'Transport',
                employeeId: employeeId,
                amount: 540.00,
            },
        ];

        let claimCount = 0;
        for (const claim of claimsData) {
            try {
                const response = await fetch(`${API_BASE}/payroll-tracking/claims`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(claim),
                });
                if (response.ok) {
                    claimCount++;
                    console.log(`   ✅ Created claim: ${claim.claimId}`);
                } else {
                    const error = await response.text();
                    console.log(`   ⚠️  Failed: ${claim.claimId} - ${error}`);
                }
            } catch (e) {
                console.log(`   ❌ Error creating claim: ${claim.claimId}`);
            }
        }
        console.log(`   Created ${claimCount}/${claimsData.length} claims\n`);

        // Get a payslip for disputes
        console.log('📄 Fetching payslips for disputes...');
        let payslips = [];
        try {
            const payslipResponse = await fetch(`${API_BASE}/payroll-tracking/payslips/employee/${employeeId}`);
            payslips = await payslipResponse.json();
            console.log(`   Found ${payslips.length} payslips\n`);
        } catch (e) {
            console.log('   ⚠️  Could not fetch payslips\n');
        }

        const payslipId = payslips[0]?._id || '507f1f77bcf86cd799439012';

        // ========================================
        // SEED DISPUTES
        // ========================================
        console.log('⚠️  Seeding Disputes...');

        const disputesData = [
            {
                disputeId: `DISP-2025-${Date.now().toString().slice(-4)}-001`,
                description: 'Overtime hours from October 2025 were not included in the November payslip. Worked 12 extra hours on project deadline.',
                employeeId: employeeId,
                payslipId: payslipId,
            },
            {
                disputeId: `DISP-2025-${Date.now().toString().slice(-4)}-002`,
                description: 'Transport allowance incorrectly calculated in December payslip. Should be $350 but received $280.',
                employeeId: employeeId,
                payslipId: payslipId,
            },
        ];

        let disputeCount = 0;
        for (const dispute of disputesData) {
            try {
                const response = await fetch(`${API_BASE}/payroll-tracking/disputes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dispute),
                });
                if (response.ok) {
                    disputeCount++;
                    console.log(`   ✅ Created dispute: ${dispute.disputeId}`);
                } else {
                    const error = await response.text();
                    console.log(`   ⚠️  Failed: ${dispute.disputeId} - ${error}`);
                }
            } catch (e) {
                console.log(`   ❌ Error creating dispute: ${dispute.disputeId}`);
            }
        }
        console.log(`   Created ${disputeCount}/${disputesData.length} disputes\n`);

        // Summary
        console.log('━'.repeat(50));
        console.log('📊 SEED SUMMARY');
        console.log('━'.repeat(50));
        console.log(`   Claims:    ${claimCount} records`);
        console.log(`   Disputes:  ${disputeCount} records`);
        console.log('\n✅ Payroll tracking data seeded successfully!');

    } catch (error) {
        console.error('❌ Error seeding data:', error);
    }
}

seedPayrollTrackingData();
