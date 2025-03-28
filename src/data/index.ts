

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

interface Friend_Requests {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    email: string;
    createdAt: string;
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


export const Friend_Requests: Friend_Requests[] = [
    {
        _id: "65870774cd86e8c7c9b358eb",
        firstName: "User",
        lastName: "1",
        avatar: "",
        email: "user@gmail.com",
        createdAt: "2023-12-12T15:39:14.688+00:00",
    },
    {
        _id: "65787ea22c8433b199ced18e",
        firstName: "Akshat",
        lastName: "Mishra",
        avatar: "",
        email: "akshat@gmail.com",
        createdAt: "2023-12-12T15:39:14.688+00:00",
    },
    {
        _id: "65bbb5db34b2e8f010a59452",
        firstName: "Dhananjay",
        lastName: "Jain",
        avatar: "",
        email: "dhananjay@gmail.com",
        createdAt: "2023-12-12T15:39:14.688+00:00",
    },
    {
        _id: "65d1f4411203451e7ea8b44b",
        firstName: "Vipul",
        lastName: "Kumar",
        avatar: "",
        email: "vipulk0000@gmail.com",
        createdAt: "2023-12-12T15:39:14.688+00:00",
    },
];