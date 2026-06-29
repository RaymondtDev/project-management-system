import { Box, Skeleton } from "@mui/material";

function ProjectsSkeleton() {
  return (  
    <Box sx={{ width: "100%", height: "100%" }}>
      <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={80} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={80} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={80} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={80} sx={{ mb: 2 }} />
    </Box>
  );
}

export default ProjectsSkeleton;