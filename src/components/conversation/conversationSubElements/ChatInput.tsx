import { useRef, useState } from "react";
import {
    Stack,
    TextField,
    Tooltip,
    Fab,
    IconButton,
    InputAdornment,
    Popover,
    useMediaQuery,
} from "@mui/material";
import { LinkSimple, Smiley } from "phosphor-react";

// import { Actions } from "../../../../../data";
import { useDispatch } from "react-redux";
import actionHandler from "@components/chatMediaActions/actionhandler";
import { socket } from "@utils/socket";

// import { Actions } from "../../../data/index";
import {
    //   Nav Buttons
    UserCircle,
    ChatCircleDots,
    Users,
    UserList,
    Gear,

    //   Profile Menu
    IdentificationCard,

    // Text Field Actions
    Image,
    GameController,
    File,
    User,
} from "phosphor-react";


export const Actions = [
    {
        color: "darker",
        contrast: "#fff",
        icon: <GameController weight="fill" size={24} />,
        title: "Gaming",
    },
    {
        color: "dark",
        contrast: "#fff",
        icon: <Image weight="fill" size={24} />,
        title: "Photo",
    },
    {
        color: "light",
        contrast: "#333",
        icon: <File size={24} />,
        title: "Document",
    },
    {
        color: "lighter",
        contrast: "#222",
        icon: <User size={24} />,
        title: "Contact",
    },
];

const ChatInput = ({
    openPicker,
    setOpenPicker,
    setValue,
    value,
    inputRef,
    handleSubmit,
    theme,
    convo_id,
    isOptimistic,
}) => {
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);

    // from redux
    const dispatch = useDispatch();

    // -------------- Inner Functions --------------
    const handlePopoverOpen = (event) => {
        setPopoverAnchor(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setPopoverAnchor(null);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    // --------- typing handlers ---------
    const startTyping = () => {
        socket.emit("start_typing", convo_id);
        setIsTyping(true);
    };

    const stopTyping = () => {
        socket.emit("stop_typing", convo_id);
        setIsTyping(false);
    };

    const onChangeHandler = (event) => {
        setValue(event.target.value);

        if (!isTyping && value.trim() !== "") {
            startTyping();
        }

        clearTimeout(typingTimeoutRef.current);
        const timer = isOptimistic ? 1000 : 5000;
        typingTimeoutRef.current = setTimeout(stopTyping, timer); // 1 seconds
    };
    // ------------------------------------

    // fn() to handle actions click
    const handleActions = (type) => {
        actionHandler(type.toLowerCase(), dispatch);

        handlePopoverClose();
    };
    // ------------------------------------------

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

    return (
        <TextField
            inputRef={inputRef}
            value={value}
            onChange={(event) => {
                onChangeHandler(event);
            }}
            onKeyDown={handleKeyPress}
            fullWidth
            multiline
            maxRows={3}
            autoComplete="off"
            autoFocus
            placeholder={isSmallScreen ? "Message..." : "Write a message..."}
            variant="outlined"
            InputProps={{
                sx: {
                    borderRadius: 20,
                    backgroundColor: theme.palette.background.paper,
                    minHeight: 55,
                    "& textarea": {
                        scrollbarColor: `${theme.palette.primary.main} transparent`,
                        scrollbarWidth: "thin",
                        "&::-webkit-scrollbar": {
                            width: "5px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "transparent",
                        },
                    },
                },
                startAdornment: (
                    <Stack>
                        <Popover
                            open={Boolean(popoverAnchor)}
                            anchorEl={popoverAnchor}
                            onClose={handlePopoverClose}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            slotProps={{
                                paper: {
                                    sx: {
                                        backgroundColor: "transparent !important",
                                        boxShadow: "none",
                                        padding: 2,
                                    },
                                },
                            }}
                        >
                            <Stack spacing={2}>
                                {Actions.map((el) => (
                                    <Tooltip placement="right" title={el.title} key={el.title}>
                                        <Fab
                                            onClick={() => handleActions(el.title)}
                                            sx={{
                                                backgroundColor: theme.palette.primary[el.color],
                                                color: el.contrast,
                                                transition: "all 0.5s ease",
                                                "&:hover": {
                                                    color: "#fff",
                                                },
                                            }}
                                            aria-label="add"
                                        >
                                            {el.icon}
                                        </Fab>
                                    </Tooltip>
                                ))}
                            </Stack>
                        </Popover>

                        <InputAdornment position="start">
                            <IconButton onClick={handlePopoverOpen}>
                                <LinkSimple />
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),

                endAdornment: (
                    <Stack sx={{ position: "relative" }}>
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => {
                                    setOpenPicker(!openPicker);
                                }}
                            >
                                <Smiley />
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
            }}
        />
    );
};

export default ChatInput;
