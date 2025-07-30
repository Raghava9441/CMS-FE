import { RouteConfig } from '@models/routes.types';
import { Box } from '@mui/material';

type Props = {
    route: RouteConfig;
}

function AccessDeniedComponent({ route }: Props) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            
        </Box>
    )
}

export default AccessDeniedComponent