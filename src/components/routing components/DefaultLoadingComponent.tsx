
type Props = {}

function DefaultLoadingComponent({ }: Props) {
    return (
        <ShimmerTableSkeleton />
    )
}

export default DefaultLoadingComponent

// ShimmerTableSkeleton.tsx
import { Box, Skeleton, IconButton } from '@mui/material';

const rowCount = 10;
const columnCount = 6;

const ShimmerTableSkeleton = () => {
    return (
        <Box sx={{ width: '100%', p: 1 }}>
            {/* Top toolbar: Search, Filters, Export, Add Record */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
                flexWrap="wrap"
                gap={2}
            >
                {/* Search & Filters */}
                <Box display="flex" alignItems="center" gap={2}>
                    <Skeleton variant="rectangular" width={200} height={36} />
                    <Skeleton variant="circular" width={36} height={36} />
                </Box>

                {/* Export & Add */}
                <Box display="flex" alignItems="center" gap={2}>
                    <Skeleton variant="rectangular" width={80} height={36} />
                    <Skeleton variant="rectangular" width={120} height={36} />
                </Box>
            </Box>

            {/* Table Header Skeleton */}
            <Box display="flex" mb={1} gap={1}>
                {Array.from({ length: columnCount }).map((_, i) => (
                    <Skeleton
                        key={i}
                        variant="rectangular"
                        height={32}
                        width={`${100 / columnCount}%`}
                        sx={{ borderRadius: 1 }}
                    />
                ))}
            </Box>

            {/* Table Rows Skeleton */}
            {Array.from({ length: rowCount }).map((_, rowIdx) => (
                <Box key={rowIdx} display="flex" mb={1} gap={1}>
                    {Array.from({ length: columnCount }).map((_, colIdx) => (
                        <Skeleton
                            key={colIdx}
                            variant="rectangular"
                            height={40}
                            width={`${100 / columnCount}%`}
                            sx={{ borderRadius: 1 }}
                        />
                    ))}
                </Box>
            ))}

            {/* Pagination Skeleton */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={3}
                flexWrap="wrap"
                gap={2}
            >
                <Skeleton variant="text" width={150} height={28} />
                <Skeleton variant="text" width={200} height={28} />
                <Box display="flex" gap={1}>
                    <Skeleton variant="circular" width={32} height={32} />
                    <Skeleton variant="circular" width={32} height={32} />
                </Box>
            </Box>
        </Box>
    );
};

