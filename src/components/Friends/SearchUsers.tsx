import { GetOrganizationUsers } from "@redux/actions/Friend.actions"
import { RootState } from "@redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Friend_Requests } from "../../data/index";
import UserCard from "./FriendSubComponents/UserCard";
import { Box, Grid, Stack } from "@mui/material";


type Props = {}

function SearchUsers({ }: Props) {

    const dispatch = useDispatch()

    const { isOrgUsersLoading, orgUsers } = useSelector((state: RootState) => state.Friends);
    console.log(orgUsers[0])

    useEffect(() => {
        dispatch(GetOrganizationUsers())
    }, [])

    return (
        <Box height={"100%"} width={"100%"} p={2} sx={{
            height: "500px", // Try a fixed value to test
            overflowY: "auto",
            // ...other styles
        }}>
            <Stack spacing={1} alignItems={"center"} justifyContent={"center"}>
                <Grid container spacing={3} gap={1}>
                    {
                        !isOrgUsersLoading ? (orgUsers.map((user) => (
                            <UserCard
                                key={user._id}
                                thisUser={user}
                                fromSection={"SearchUsers"}
                                isLoading={isOrgUsersLoading}
                            />
                        ))) : (
                            // Loading Cards
                            Friend_Requests.map((sender) => (
                                <UserCard
                                    key={sender._id}
                                    thisUser={sender}
                                    fromSection={"SearchUsers"}
                                    isLoading={isOrgUsersLoading}
                                />
                            ))
                        )
                    }
                </Grid>
            </Stack>
        </Box>
    )
}

export default SearchUsers