

interface MembersList {
    _id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    activityStatus: string;
    msg: string;
    time: string;
    unread: number;
    pinned: boolean;
    online: boolean;
}

export const MembersList: MembersList[] = [
    {
        _id: 0,
        firstName: "Vaibhav",
        lastName: "Mishra",
        avatar: "",
        activityStatus: "Hey there! I love using TwinkConnect ❤️",
        msg: "Hello",
        time: "9:36",
        unread: 2,
        pinned: false,
        online: true,
    },
    {
        _id: 1,
        firstName: "Gaibhav",
        lastName: "Mishra",
        avatar: "",
        activityStatus: "Hey there! I love using TwinkConnect ❤️",
        msg: "Hello",
        time: "9:36",
        unread: 0,
        pinned: false,
        online: true,
    },
    {
        _id: 2,
        firstName: "Baibhav",
        lastName: "Mishra",
        avatar: "",
        activityStatus: "Hey there! I love using TwinkConnect ❤️",
        msg: "Hello",
        time: "9:36",
        unread: 5,
        pinned: false,
        online: true,
    },
    {
        _id: "65787ea22c8433b199ced18d",
        firstName: "Aaibhav",
        lastName: "Mishra",
        avatar: "",
        activityStatus: "Hey there! I love using TwinkConnect ❤️",
        msg: "Hello",
        time: "9:36",
        unread: 0,
        pinned: false,
        online: true,
    },
];