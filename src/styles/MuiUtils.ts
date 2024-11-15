import { SxProps, Theme } from '@mui/material/styles';

// Type for utility function return
type StyleUtility = Record<string, SxProps<Theme>>;

export const flexUtils: StyleUtility = {
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flexStart: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    flexEnd: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    flexWrap: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

export const spacingUtils: StyleUtility = {
    p1: { padding: 1 },
    p2: { padding: 2 },
    p3: { padding: 3 },
    p4: { padding: 4 },
    px1: { px: 1 },
    px2: { px: 2 },
    px3: { px: 3 },
    px4: { px: 4 },
    py1: { py: 1 },
    py2: { py: 2 },
    py3: { py: 3 },
    py4: { py: 4 },
    m1: { margin: 1 },
    m2: { margin: 2 },
    m3: { margin: 3 },
    m4: { margin: 4 },
    mx1: { mx: 1 },
    mx2: { mx: 2 },
    mx3: { mx: 3 },
    mx4: { mx: 4 },
    my1: { my: 1 },
    my2: { my: 2 },
    my3: { my: 3 },
    my4: { my: 4 },
};

export const textUtils: StyleUtility = {
    textCenter: { textAlign: 'center' },
    textLeft: { textAlign: 'left' },
    textRight: { textAlign: 'right' },
    textBold: { fontWeight: 'bold' },
    textLight: { fontWeight: 300 },
    textMedium: { fontWeight: 500 },
    textPrimary: { color: 'primary.main' },
    textSecondary: { color: 'secondary.main' },
    textError: { color: 'error.main' },
    textSuccess: { color: 'success.main' },
    textWarning: { color: 'warning.main' },
    truncate: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

export const sizeUtils: StyleUtility = {
    fullWidth: { width: '100%' },
    fullHeight: { height: '100%' },
    fullSize: { width: '100%', height: '100%' },
    halfWidth: { width: '50%' },
    halfHeight: { height: '50%' },
    fitContent: { width: 'fit-content' },
    minFullHeight: { minHeight: '100%' },
    minFullWidth: { minWidth: '100%' },
};

export const positionUtils: StyleUtility = {
    relative: { position: 'relative' },
    absolute: { position: 'absolute' },
    fixed: { position: 'fixed' },
    sticky: { position: 'sticky' },
    absoluteCenter: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    absoluteTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    absoluteBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
};

export const borderUtils: StyleUtility = {
    borderRadius1: { borderRadius: 1 },
    borderRadius2: { borderRadius: 2 },
    borderRadius3: { borderRadius: 3 },
    borderRadius4: { borderRadius: 4 },
    borderCircle: { borderRadius: '50%' },
    border1: { border: 1 },
    border2: { border: 2 },
    borderPrimary: { borderColor: 'primary.main' },
    borderSecondary: { borderColor: 'secondary.main' },
};

export const effectUtils: StyleUtility = {
    shadow1: { boxShadow: 1 },
    shadow2: { boxShadow: 2 },
    shadow3: { boxShadow: 3 },
    shadow4: { boxShadow: 4 },
    transition: {
        transition: theme => theme.transitions.create(['all']),
    },
    hover: {
        '&:hover': {
            opacity: 0.8,
            transition: theme => theme.transitions.create(['opacity']),
        },
    },
};

// Combine all utilities
export const muiUtils = {
    ...flexUtils,
    ...spacingUtils,
    ...textUtils,
    ...sizeUtils,
    ...positionUtils,
    ...borderUtils,
    ...effectUtils,
};

export default muiUtils;