import AllChatElement from "@components/conversation/chat elements/AllChatElements";
import { IconButton, Stack, Typography } from "@mui/material";
import { RootState } from "@redux/store"
import { useState } from "react";
import { useSelector } from "react-redux"



const FriendList = () => {

    const { user, friends, isLoading } = useSelector((state: RootState) => state.auth);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  console.log(isLoading)

    const toggleDrawer = (selectedId) => {
        setOpenDrawer(!openDrawer);
    
        setSelectedUserId(selectedId);
      };

    return (
        <Stack height={"100%"}>
            <Stack p={3} spacing={2} sx={{ height: "100%" }}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography component={"h1"} variant="h5">
                        Contacts
                    </Typography>
                    {/* <IconButton
                        onClick={() => dispatch(setShowFriendsMenu())}
                        sx={{ display: { xs: "flex", md: "none" } }}
                    >
                        <UserPlus />
                    </IconButton> */}

                    {/* Search section */}
                    {/* <Stack sx={{ width: "100%" }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color={theme.palette.primary.main} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search..."
                                inputProps={{ "aria-label": "search" }}
                                onChange={(e) => handleSearch(e)}
                            />
                        </Search>
                    </Stack> */}


                    <Stack spacing={0.5}>
                        {/* <Typography variant="subtitle2">{letter}</Typography> */}
                        {friends.map((friend) => (
                            <AllChatElement
                                key={friend._id}
                                {...friend}
                                latestMessage={
                                    friend._id === user._id
                                        ? { message: "Message yourself" }
                                        : friend.latestMessage
                                }
                                isLoading={isLoading}
                                fromContact={true}
                                toggleDrawer={toggleDrawer}
                            />
                        ))}
                    </Stack>

                </Stack>
            </Stack>
        </Stack>
    )
}

export default FriendList