import React from 'react';
import { Box, Button, IconButton, Typography, Slide, Dialog, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});

interface GenericModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    onSave?: () => void;
    children: React.ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({ open, onClose, title, onSave, children }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            keepMounted
            PaperProps={{
                sx: {
                    width: { sm: '100%', md: '30%' },
                    maxWidth: 'none',
                    height: '100%',
                    margin: 0,
                    borderRadius: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                },
            }}
        >
            <Box sx={{ position: 'relative', height: '100%' }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                {title && (
                    <Box sx={{ padding: 2 }}>
                        <Typography variant="h6">{title}</Typography>
                    </Box>
                )}
                <DialogContent sx={{ height: 'calc(100% - 64px)', overflow: 'auto' }}>
                    {children}
                </DialogContent>
                {onSave && (
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onSave} variant="contained" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                )}
            </Box>
        </Dialog>
    );
};

export default GenericModal;