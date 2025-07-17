import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Collapse,
    Divider,
    IconButton,
    Link,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';
import BugReportIcon from '@mui/icons-material/BugReport';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import appRoutes from '@routes/routePaths';

type Props = {
    error: Error;
    retry: () => void;
    errorId: string;
};

const ExpandMore = styled((props: { expand: boolean } & any) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const getFirstFrame = (stack: string) =>
    (stack || '')
        .split('\n')
        .map((l) => l.trim())
        .find((l) => l.startsWith('at ') && !l.includes('node_modules'));

const openInEditor = (url: string) => {
    // url ≈ http://localhost:5173/src/components/Friends/FriendList.tsx?t=1710000000000:48:110
    const m = url.match(/\/([^/]+\.tsx?)\?[^:]*:(\d+):(\d+)/);
    if (!m) return;
    const [, file, line] = m;                         // file = src/components/Friends/FriendList.tsx

    // Get the base path from the current window location (assuming it's consistent with Vite's base)
    // Alternatively, you could hardcode it if it's always '/CMS-FE/'
    const basePath = window.location.pathname.split('/')[1] === 'CMS-FE' ? '/CMS-FE' : '';

    // Construct the correct URL, including the base path
    fetch(`${basePath}/__open-in-editor?file=${encodeURIComponent(file)}:${line}`);
};

export default function DefaultErrorComponent({ error, retry, errorId }: Props) {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const firstFrame = getFirstFrame(error.stack);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                p: 2,
                background: (t) =>
                    t.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)'
                        : 'linear-gradient(135deg, #121212 0%, #303030 100%)',
            }}
        >
            <Card sx={{ maxWidth: 720, width: '100%' }}>
                <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                        <BugReportIcon color="error" />
                        <Typography variant="h5" fontWeight={600}>
                            Oops! Something went wrong
                        </Typography>
                    </Stack>

                    <Typography variant="body1" mb={1}>
                        <strong>Message:</strong> {error.message}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Error ID: <code>{errorId}</code>
                        <Tooltip title="Copy details" arrow>
                            <IconButton size="small" onClick={() => navigator.clipboard.writeText(
                                `Error: ${error.message}\nID: ${errorId}\nStack:\n${error.stack || ''}`,
                            )}
                            >
                                <ContentCopyIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Typography>

                    {firstFrame && (
                        <Chip
                            label={`${firstFrame}`}
                            color="error"
                            variant="outlined"
                            onClick={() => openInEditor(firstFrame)}
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                height: 28,
                                mb: 2,
                            }}
                        />
                    )}

                    <Divider sx={{ my: 1 }} />

                    <Stack direction="row" alignItems="center">
                        <Typography variant="h6" fontSize="1rem">
                            Full stack trace
                        </Typography>
                        <ExpandMore
                            expand={expanded}
                            onClick={() => setExpanded(!expanded)}
                            aria-expanded={expanded}
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </Stack>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Typography
                            component="pre"
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                backgroundColor: 'grey.100',
                                p: 1.5,
                                borderRadius: 1,
                                fontFamily: 'monospace',
                                whiteSpace: 'pre-wrap',
                                maxHeight: 320,
                                overflow: 'auto',
                                [theme.palette.mode === 'dark' ? '&' : null]: {
                                    backgroundColor: 'grey.900',
                                },
                            }}
                        >
                            {error.stack || 'No stack trace available'}
                        </Typography>
                    </Collapse>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<RefreshIcon />}
                        onClick={retry}
                    >
                        Retry
                    </Button>
                    <Link href={appRoutes.DASHBOARD} underline="none">
                        <Button
                            variant="outlined"
                            startIcon={<HomeIcon />}
                            sx={{ ml: 1 }}
                        >
                            Go to home
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </Box>
    );
}