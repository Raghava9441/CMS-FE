import { Box } from '@mui/material'

type Props = {}

function _404({ }: Props) {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>404 Page Not Found</div>
        </Box>
    )
}

export default _404