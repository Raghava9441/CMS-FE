// import { Avatar, Theme } from "@mui/material";

const PRIMARY_NAME = ["A", "N", "H", "L", "Q", "9", "8"];
const INFO_NAME = ["F", "G", "T", "I", "J", "1", "2", "3"];
const SUCCESS_NAME = ["K", "D", "Y", "B", "O", "4", "5"];
const WARNING_NAME = ["P", "E", "R", "S", "C", "U", "6", "7"];
const ERROR_NAME = ["V", "W", "X", "M", "Z"];

interface AvatarProps {
    name: string;
    color: "primary" | "info" | "success" | "warning" | "error";
}

export function getFirstCharacter(name: string): string {
    return name ? name.charAt(0).toUpperCase() : "";
}

export function getAvatarColor(name: string): "primary" | "info" | "success" | "warning" | "error" {
    if (PRIMARY_NAME.includes(getFirstCharacter(name))) return "primary";
    if (INFO_NAME.includes(getFirstCharacter(name))) return "info";
    if (SUCCESS_NAME.includes(getFirstCharacter(name))) return "success";
    if (WARNING_NAME.includes(getFirstCharacter(name))) return "warning";
    if (ERROR_NAME.includes(getFirstCharacter(name))) return "error";
    return "primary";
}

export const createAvatar = (name: string): AvatarProps => {
    return {
        name: getFirstCharacter(name),
        color: getAvatarColor(name),
    };
};

// const getSize = (size: number): number | "auto" => {
//     if (size <= 20) {
//         return size - 5;
//     } else if (size <= 40) {
//         return size - 15;
//     } else if (size > 40 && size <= 50) {
//         return "auto";
//     } else {
//         return size - 40;
//     }
// };

// interface GetAvatarProps {
//     avatar?: string;
//     name: string;
//     theme?: Theme;
//     size: number;
// }

// export default function getAvatar({ avatar, name, theme, size }: GetAvatarProps): JSX.Element {
//     if (avatar) {
//         return (
//             <Avatar
//                 src= { avatar }
//         alt = { name }
//         sx = {{ width: size, height: size }
//     }
//             />
//         );
// }
//             />
//         );
// }

// return (
//     <Avatar
//             sx= {{
//     backgroundColor: theme
//         ? theme.palette[createAvatar(name).color].main
//         : "none",
//         fontWeight: 800,
//             color: "#fff",
//                 width: size,
//                     height: size,
//                         fontSize: getSize(size),
//             }}
// alt = { name }
//     >
//     { createAvatar(name).name }
//     </Avatar>
//     );
// }