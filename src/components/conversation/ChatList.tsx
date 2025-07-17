import { Divider, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { ClearSearch, setShowFriendsMenu } from "@redux/slices/authSlice";
import { RootState } from "@redux/store";
import { MembersList } from "../../data/index";
// import { MembersList } from "data";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchFriends } from "@redux/actions/userActions";
import AllChatElement from "./chat elements/AllChatElements";
import { MagnifyingGlass } from "phosphor-react";
import Search from "@components/search/Search";
import SearchIconWrapper from "@components/search/SearchIconWrapper";
import StyledInputBase from "@components/search/StyledInputBase";


function ChatsList() {
    const theme = useTheme();
    const dispatch = useDispatch();
    // const { conversations, activeConversation } = useSelector((state: RootState) => state.chat);
    const { user, friends, searchResults, searchCount, isLoading } = useSelector((state: RootState) => state.auth);

    // states
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [prevSearchTerm, setPrevSearchTerm] = useState<string>("");
    const [usersFound, setUsersFound] = useState([]);
    const [page, setPage] = useState<number>(1);

    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");

    const toggleDrawer = (selectedId) => {
        setOpenDrawer(!openDrawer);

        setSelectedUserId(selectedId);
    };

    // function to handle searched term
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== "") {
                const searchData = { keyword: searchTerm, page: 0 };
                dispatch(SearchFriends(searchData));
            } else {
                dispatch(ClearSearch());
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [dispatch, searchTerm]);

    // After the searchResults are updated, set them to usersFound
    useEffect(() => {
        if (searchResults?.length > 0) {
            if (
                prevSearchTerm === searchTerm &&
                JSON.stringify(usersFound) !== JSON.stringify(searchResults) &&
                usersFound
            ) {
                setUsersFound((prevUsersFound) => [
                    ...prevUsersFound,
                    ...searchResults,
                ]);
            } else {
                setUsersFound(searchResults);
            }
        } else if (searchResults === null) {
            setUsersFound(null);
        } else {
            setUsersFound([]);
        }

        // Update prevSearchTerm
        setPrevSearchTerm(searchTerm);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResults]);

    const handleSearchPageChange = () => {
        // Increment the page count and dispatch SearchFriends with the new page
        setPage((prevpage) => prevpage + 1);
        const searchData = { keyword: searchTerm, page: page };
        dispatch(SearchFriends(searchData));
    };

    // Sort MembersList alphabetically by firstName
    const sortedMembersList = friends
        ?.slice()
        .sort((a, b) => a.fullname.localeCompare(b.fullname));

    // Group contacts by first letter of firstName
    const groupedContacts = sortedMembersList.reduce((acc, contact) => {
        const firstLetter = contact.fullname[0].toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {});

    return (
        <Stack height={"100%"}>
            <Stack p={3} spacing={2} sx={{ height: "100%" }}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography component={"h1"} variant="h5">
                        Contacts
                    </Typography>
                    <IconButton
                        onClick={() => dispatch(setShowFriendsMenu())}
                        sx={{ display: { xs: "flex", md: "none" } }}>
                        {/* <UserPlus /> */}
                        <>isidugfh</>
                    </IconButton>
                </Stack>

                {/* Search section */}
                <Stack sx={{ width: "100%" }}>
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
                </Stack>

                {!searchTerm ? (
                    <>
                        {/* Online Friends Slider */}
                        {/* <OnlineFriendsElement fromContact={true} /> */}
                        <Divider />

                        <Typography
                            component={"h2"}
                            variant="subtitle2"
                            sx={{ color: "#676767" }}
                        >
                            All Contacts
                        </Typography>

                        {/* Contacts section starts here */}
                        <Stack
                            direction={"column"}
                            sx={{
                                flexGrow: 1,
                                overflow: "scroll",
                                height: "100%",
                                overflowY: "auto",
                                overflowX: "hidden",
                            }}
                            spacing={4}
                            className="scrollbar">
                            {isLoading ? MembersList.map((e) => {
                                return (
                                    <AllChatElement
                                        key={e._id}
                                        {...e}
                                        isLoading={isLoading}
                                    />
                                );
                            }) : //Render contacts grouped by first letter
                                Object.entries(groupedContacts).map(([letter, contacts]) => (
                                    <Stack spacing={0.5} key={letter}>
                                        {/* {
                                            console.log(contacts)
                                        } */}
                                        {/* <Typography variant="subtitle2">{letter}</Typography> */}
                                        {contacts.map((contact) => (
                                            <AllChatElement
                                                key={contact._id}
                                                {...contact}
                                                latestMessage={
                                                    contact._id === user._id
                                                        ? { message: "Message yourself" }
                                                        : contact.latestMessage
                                                }
                                                isLoading={isLoading}
                                                fromContact={true}
                                                toggleDrawer={toggleDrawer}
                                            />
                                        ))}
                                    </Stack>
                                ))}
                        </Stack>
                    </>
                ) : (
                    // Search Results
                    <Fragment>
                        <Divider />

                        <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                            Search Result{searchCount > 0 && `: ${searchCount}`}
                        </Typography>

                        {/* <ChatSearchResults
                            isLoading={isLoading}
                            searchResults={usersFound}
                            searchCount={searchCount}
                            currentPage={page}
                            onSearchPageChange={handleSearchPageChange}
                            currentUser={user._id}
                            toggleDrawer={toggleDrawer}
                            fromContact={true}
                        /> */}
                    </Fragment>
                )}
            </Stack>

            {/* <UserProfileDrawer
                openDrawer={openDrawer}
                toggleDrawer={toggleDrawer}
                selectedUserData={{ _id: selectedUserId }}
                isFrom={"Contacts"}
            /> */}
        </Stack>
    )
}

export default ChatsList