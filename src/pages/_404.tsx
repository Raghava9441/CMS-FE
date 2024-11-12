import { Box } from '@mui/material'
import LottieAnimation from '../components/LottieAnimation'
import { useNavigate } from 'react-router-dom'
import appRoutes from '@routes/routePaths'

type Props = {}

function _404({ }: Props) {
    const navigate = useNavigate()

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Box>
                <LottieAnimation />
            </Box>
            <Box>Page Not Found</Box>
            <Box sx={{ marginTop: "16px", display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>Go to home page <a style={{ cursor: "pointer" }} onClick={() => navigate(appRoutes.DASHBOARD)}>here</a></Box>
        </Box>
    )
}

export default _404