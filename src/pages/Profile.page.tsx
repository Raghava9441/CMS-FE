import { Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { User } from "@redux/slices/authSlice";
import { RootState } from "@redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import muiUtils from "@styles/MuiUtils";

type Props = {}

function ProfilePage({ }: Props) {
    const storeUser: User | null = useSelector((state: RootState) => state.auth.user);

    const [user, setUser] = useState<User | null>(storeUser);

    const [isEditing, setIsEditing] = useState(false);

    if (!user) {
        return null;
    }

    const handleEdit = () => {
        if (isEditing) {
            saveProfile();
        } else {
            setIsEditing(true);
        }
    };

    const saveProfile = async () => {
        try {
            // alert("hd")
            // Assuming there's a function to make the API call
            // await updateUserProfile(user);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save profile:", error);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 2 }}>
                <Typography variant="h5">Profile</Typography>
                <Button variant="outlined" size="small" sx={{ mt: 2 }} onClick={handleEdit}>{isEditing ? 'Save Profile' : 'Edit Profile'}</Button>
            </Box>
            <Box sx={{ width: '100%', height: '100%', paddingX: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: "80%" }}>
                    <Box sx={{ position: 'relative', width: '100%' }}>
                        <Avatar alt="Cover Image" src={user.coverImage} sx={{ width: '100%', height: 128 }} />
                        <Avatar alt="Profile Picture" src={user.avatar} sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 128, height: 128 }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: '100%' }}>
                        <Box sx={{ width: "50%", }}>
                            <Box sx={{ ...muiUtils.flexCenter, gap: 2, width: '100%' }}>
                                <TextField
                                    label="Full Name"
                                    value={user.fullname}
                                    size="small"
                                    disabled={!isEditing}
                                    onChange={e => setUser({ ...user, fullname: e.target.value })}
                                    sx={{ mt: 2, width: '100%' }}
                                />
                                <TextField
                                    label="Email"
                                    value={user.email}
                                    size="small"
                                    disabled
                                    sx={{ mt: 2, width: '100%' }}
                                />
                            </Box>
                            <TextField
                                label="Organization"
                                fullWidth
                                value={user.organizationId}
                                size="small"
                                disabled
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Phone Number"
                                fullWidth
                                value={user.phone}
                                onChange={e => setUser({ ...user, phone: e.target.value })}
                                size="small"
                                disabled={!isEditing}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Role"
                                fullWidth
                                value={user.role}
                                size="small"
                                disabled
                                sx={{ mt: 2 }}
                            />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    aria-label="gender"
                                    name="gender1"
                                    value={user.gender}
                                    onChange={(e) => setUser({ ...user, gender: e.target.value as "male" | "female" | "other" })}
                                    row
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>

                        </Box>
                        <Box sx={{ width: "50%", }}>
                            <TextField
                                label="Biography"
                                fullWidth
                                value={user.biography}
                                size="small"
                                disabled={!isEditing}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Birthday"
                                fullWidth
                                value={user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : ''}
                                size="small"
                                disabled={!isEditing}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Address"
                                fullWidth
                                value={user.address}
                                size="small"
                                disabled={!isEditing}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Status"
                                fullWidth
                                value={user.status}
                                size="small"
                                disabled
                                sx={{ mt: 2 }}
                            />
                            <ToggleButtonGroup
                                exclusive
                                value={user.preferences?.notifications}
                                disabled={!isEditing}
                                onChange={(e, value) => setUser({ ...user, preferences: { ...user.preferences, notifications: value } })}
                                sx={{ mt: 2 }}
                            >
                                <ToggleButton value="true" selected={user.preferences?.notifications === true}>On</ToggleButton>
                                <ToggleButton value="false" selected={user.preferences?.notifications === false}>Off</ToggleButton>
                            </ToggleButtonGroup>
                            <TextField
                                label="Language"
                                value={user.preferences?.language}
                                size="small"
                                disabled={!isEditing}
                                sx={{ mt: 2 }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ProfilePage