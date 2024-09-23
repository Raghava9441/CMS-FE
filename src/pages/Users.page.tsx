import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { userActions } from "../redux/actions/userActions";
import { useEffect, useState } from "react";
import { User } from "../api/auth.api";

type Props = {}

function UsersPage({ }: Props) {
  const [userDetails, setUserDetails] = useState<Omit<User, 'password' | 'accessToken' | 'refreshToken'> | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { loading, data: userResponse } = useSelector((state: RootState) => state.user);

  console.log(userResponse)

  useEffect(() => {
    dispatch(userActions.fetchUsers());
  }, [])

  const handleCreateUser = (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>) => {
    dispatch(userActions.createUser(user));
  };

  const handleEditUser = (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>) => {
    dispatch(userActions.updateUser(user));
  };

  const handleDeleteUser = (userId: string) => {
    dispatch(userActions.deleteUser(userId));
  };

  return (
    <div>Users</div>
  )
}

export default UsersPage