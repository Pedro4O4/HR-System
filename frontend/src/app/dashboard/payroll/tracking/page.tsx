'use client';

import { Grid, Typography, Box, Card, CardContent, Avatar, Chip, IconButton, CircularProgress } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ReceiptLong, RequestQuote, ReportProblem, ArrowBack, TrendingUp, ChevronRight } from '@mui/icons-material';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect, ReactNode } from 'react';

interface PayrollStats {
    payslips: { total: number; latestMonth: string };
    claims: { total: number; pending: number; underReview: number };
    disputes: { total: number; active: number; resolved: number };
}

interface CardData {
    title: string;
    description: string;
    icon: ReactNode;
    href: string;
    gradient: string;
    lightGradient: string;
    color: string;
    stats: string;
    badge: string;
}

export default function PayrollTrackingPage() {
    const router = useRouter();
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<PayrollStats>({
        payslips: { total: 0, latestMonth: 'N/A' },
        claims: { total: 0, pending: 0, underReview: 0 },
        disputes: { total: 0, active: 0, resolved: 0 },
    });

    useEffect(() => {
        const fetchPayrollStats = async () => {
            try {
                const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

                // Fetch claims
                const claimsRes = await fetch(`${API_BASE}/payroll-tracking/claims`);
                const claimsData = await claimsRes.json();
                // Handle both array response and { value: [...] } response
                const claims = Array.isArray(claimsData) ? claimsData : (claimsData?.value || claimsData?.data || []);

                // Fetch disputes
                const disputesRes = await fetch(`${API_BASE}/payroll-tracking/disputes`);
                const disputesData = await disputesRes.json();
                const disputes = Array.isArray(disputesData) ? disputesData : (disputesData?.value || disputesData?.data || []);

                // Calculate stats
                const claimsArray = Array.isArray(claims) ? claims : [];
                const disputesArray = Array.isArray(disputes) ? disputes : [];

                const pendingClaims = claimsArray.filter((c: any) =>
                    c.status === 'under review' || c.status === 'pending payroll Manager approval'
                ).length;

                const activeDisputes = disputesArray.filter((d: any) =>
                    d.status === 'under review' || d.status === 'pending payroll Manager approval'
                ).length;

                const resolvedDisputes = disputesArray.filter((d: any) =>
                    d.status === 'approved' || d.status === 'rejected'
                ).length;

                // Get current month for payslips badge
                const currentDate = new Date();
                const latestMonth = currentDate.toLocaleString('default', { month: 'short', year: 'numeric' });

                setStats({
                    payslips: { total: 12, latestMonth },
                    claims: {
                        total: claimsArray.length,
                        pending: pendingClaims,
                        underReview: claimsArray.filter((c: any) => c.status === 'under review').length
                    },
                    disputes: {
                        total: disputesArray.length,
                        active: activeDisputes,
                        resolved: resolvedDisputes
                    },
                });
            } catch (error) {
                console.error('Error fetching payroll stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayrollStats();
    }, []);

    const getClaimsBadge = () => {
        if (stats.claims.pending > 0) return 'Action Required';
        if (stats.claims.total === 0) return 'No Claims';
        return 'All Processed';
    };

    const getDisputesBadge = () => {
        if (stats.disputes.active > 0) return 'In Progress';
        if (stats.disputes.total === 0) return 'No Disputes';
        return 'All Resolved';
    };

    const cards: CardData[] = [
        {
            title: 'My Payslips',
            description: 'View and download your monthly payslips with detailed breakdowns of earnings and deductions',
            icon: <ReceiptLong sx={{ fontSize: 28 }} />,
            href: '/dashboard/payroll/my-payslips',
            gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
            lightGradient: 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
            color: '#059669',
            stats: `${stats.payslips.total} payslips`,
            badge: `Latest: ${stats.payslips.latestMonth}`,
        },
        {
            title: 'My Claims',
            description: 'Submit and track reimbursement claims for expenses, travel, and other allowances',
            icon: <RequestQuote sx={{ fontSize: 28 }} />,
            href: '/dashboard/payroll/claims',
            gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
            lightGradient: 'linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
            color: '#D97706',
            stats: `${stats.claims.total} claims (${stats.claims.pending} pending)`,
            badge: getClaimsBadge(),
        },
        {
            title: 'My Disputes',
            description: 'Raise and manage salary disputes, track resolution status and communicate with HR',
            icon: <ReportProblem sx={{ fontSize: 28 }} />,
            href: '/dashboard/payroll/disputes',
            gradient: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
            lightGradient: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)',
            color: '#DC2626',
            stats: `${stats.disputes.active} active`,
            badge: getDisputesBadge(),
        },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring' as const,
                stiffness: 100,
                damping: 15,
            },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Header Section */}
            <Box sx={{ mb: 5 }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            mb: 3,
                            cursor: 'pointer',
                            py: 1,
                            px: 2,
                            borderRadius: 2,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.08),
                                transform: 'translateX(-4px)',
                            },
                        }}
                        onClick={() => router.back()}
                    >
                        <ArrowBack sx={{ mr: 1, fontSize: 20, color: 'primary.main' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'primary.main' }}>
                            Back to Dashboard
                        </Typography>
                    </Box>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            Payroll Tracking
                        </Typography>
                        <Chip
                            icon={<TrendingUp sx={{ fontSize: 16 }} />}
                            label="Up to date"
                            size="small"
                            sx={{
                                bgcolor: alpha('#059669', 0.1),
                                color: '#059669',
                                fontWeight: 600,
                                '& .MuiChip-icon': { color: '#059669' },
                            }}
                        />
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            maxWidth: 500,
                            lineHeight: 1.7,
                        }}
                    >
                        Manage your payroll information, submit claims, and track disputes all in one place.
                    </Typography>
                </motion.div>
            </Box>

            {/* Cards Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Grid container spacing={3}>
                    {cards.map((card, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.title}>
                            <motion.div variants={itemVariants}>
                                <Card
                                    component={Link}
                                    href={card.href}
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textDecoration: 'none',
                                        borderRadius: 4,
                                        border: `1px solid ${alpha(card.color, 0.12)}`,
                                        background: theme.palette.mode === 'dark'
                                            ? alpha(card.color, 0.05)
                                            : `linear-gradient(180deg, ${alpha(card.color, 0.02)} 0%, ${alpha(card.color, 0.06)} 100%)`,
                                        backdropFilter: 'blur(10px)',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: `0 20px 40px ${alpha(card.color, 0.2)}`,
                                            border: `1px solid ${alpha(card.color, 0.3)}`,
                                            '& .card-arrow': {
                                                transform: 'translateX(4px)',
                                                opacity: 1,
                                            },
                                            '& .card-icon-bg': {
                                                transform: 'scale(1.1) rotate(5deg)',
                                            },
                                            '& .card-gradient-overlay': {
                                                opacity: 0.15,
                                            },
                                        },
                                    }}
                                >
                                    {/* Gradient Overlay */}
                                    <Box
                                        className="card-gradient-overlay"
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: card.gradient,
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease',
                                            pointerEvents: 'none',
                                        }}
                                    />

                                    {/* Decorative Circle */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: -40,
                                            right: -40,
                                            width: 120,
                                            height: 120,
                                            borderRadius: '50%',
                                            background: alpha(card.color, 0.08),
                                            pointerEvents: 'none',
                                        }}
                                    />

                                    <CardContent sx={{ p: 3, position: 'relative', zIndex: 1, flexGrow: 1 }}>
                                        {/* Badge */}
                                        <Chip
                                            label={card.badge}
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                right: 16,
                                                bgcolor: alpha(card.color, 0.1),
                                                color: card.color,
                                                fontWeight: 600,
                                                fontSize: '0.7rem',
                                                height: 24,
                                            }}
                                        />

                                        {/* Icon */}
                                        <Avatar
                                            className="card-icon-bg"
                                            sx={{
                                                background: card.gradient,
                                                color: '#fff',
                                                width: 64,
                                                height: 64,
                                                mb: 3,
                                                borderRadius: 3,
                                                boxShadow: `0 8px 24px ${alpha(card.color, 0.3)}`,
                                                transition: 'transform 0.3s ease',
                                            }}
                                        >
                                            {card.icon}
                                        </Avatar>

                                        {/* Title */}
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1,
                                                color: 'text.primary',
                                                letterSpacing: '-0.01em',
                                            }}
                                        >
                                            {card.title}
                                        </Typography>

                                        {/* Stats */}
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: card.color,
                                                fontWeight: 600,
                                                mb: 1.5,
                                            }}
                                        >
                                            {card.stats}
                                        </Typography>

                                        {/* Description */}
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                lineHeight: 1.6,
                                                mb: 2,
                                            }}
                                        >
                                            {card.description}
                                        </Typography>

                                        {/* Action */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                mt: 'auto',
                                                pt: 2,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: card.color,
                                                }}
                                            >
                                                View Details
                                            </Typography>
                                            <ChevronRight
                                                className="card-arrow"
                                                sx={{
                                                    fontSize: 20,
                                                    color: card.color,
                                                    ml: 0.5,
                                                    opacity: 0.7,
                                                    transition: 'all 0.2s ease',
                                                }}
                                            />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </motion.div>
    );
}
