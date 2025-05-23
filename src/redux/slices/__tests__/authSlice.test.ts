// Import the reducer and explicitly exported actions
import authReducer, {
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
  openSnackbar,      // Assuming this is now exported from authSlice.ts
  closeSnackbar,     // Assuming this is now exported from authSlice.ts
  setShowFriendsMenu,
  updateOnlineUsers,
  removeFriend,
  setLoading,        // Assuming this is now exported from authSlice.ts
  clearSearch,       // Assuming this is now exported from authSlice.ts
} from '../authSlice';

// Import types from the new location
import { User, OnlineFriend } from '../../../types/auth.types';

// Define AuthState interface locally, mirroring the structure from authSlice.ts
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | boolean;
  snackbar: {
    open: boolean;
    message: string | null;
    severity: 'error' | 'success' | 'warning' | 'info' | null;
  };
  friends: User[]; // As per corrected authSlice.ts (User[])
  onlineFriends: OnlineFriend[]; // As per corrected authSlice.ts (OnlineFriend[])
  showFriendsMenu: boolean;
  searchResults: User[] | null; // As per corrected authSlice.ts (User[] | null)
  searchCount: null | number | boolean;
  isLoading: boolean;
}

// Define baseInitialState for tests, strictly matching the slice's initialState structure values.
const baseInitialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: '',
  snackbar: {
    open: false,
    message: null,
    severity: null,
  },
  friends: [],
  onlineFriends: [],
  searchResults: [],
  showFriendsMenu: false,
  searchCount: null,
  isLoading: false,
};

describe('authSlice reducers', () => {
  let testInitialState: AuthState;
  let setItemSpy: jest.SpyInstance;
  let removeItemSpy: jest.SpyInstance;
  let getItemSpy: jest.SpyInstance;

  beforeEach(() => {
    testInitialState = JSON.parse(JSON.stringify(baseInitialState));
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      if (key === 'user' && testInitialState.user) return JSON.stringify(testInitialState.user);
      if (key === 'accessToken' && testInitialState.accessToken) return testInitialState.accessToken;
      if (key === 'refreshToken' && testInitialState.refreshToken) return testInitialState.refreshToken;
      return null;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUserStart', () => {
    it('should set loading to true', () => {
      const nextState = authReducer(testInitialState, loginUserStart());
      expect(nextState.loading).toBe(true);
    });
  });

  describe('loginUserSuccess', () => {
    const mockUser: User = {
      _id: 'user1',
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      fullname: 'Test User',
      avatar: 'avatar.png',
      role: 'STUDENT',
      gender: 'other',
      organizationId: 'org1',
      activityStatus: "", 
    };
    const payload = {
      loggedInUser: mockUser,
      accessToken: 'newAccessToken',
      refreshToken: 'newRefreshToken',
    };

    it('should update state and call localStorage.setItem on successful login', () => {
      const nextState = authReducer(testInitialState, loginUserSuccess(payload));
      expect(nextState.loading).toBe(false);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.user).toEqual(mockUser);
      expect(nextState.accessToken).toBe('newAccessToken');
      expect(nextState.refreshToken).toBe('newRefreshToken');
      expect(setItemSpy).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
      expect(setItemSpy).toHaveBeenCalledWith('accessToken', 'newAccessToken');
      expect(setItemSpy).toHaveBeenCalledWith('refreshToken', 'newRefreshToken');
      expect(setItemSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('loginUserFailure', () => {
    const error = 'Login failed miserably';
    it('should update state correctly on login failure', () => {
      const nextState = authReducer(testInitialState, loginUserFailure(error));
      expect(nextState.loading).toBe(false);
      expect(nextState.isAuthenticated).toBe(false);
      expect(nextState.error).toBe(error);
      expect(nextState.user).toBeNull();
      expect(nextState.accessToken).toBeNull();
      expect(nextState.refreshToken).toBeNull();
    });
  });

  describe('logoutUserStart', () => {
    it('should set loading to true', () => {
      const nextState = authReducer(testInitialState, logoutUserStart());
      expect(nextState.loading).toBe(true);
    });
  });

  describe('logoutUserSuccess', () => {
    it('should reset state and call localStorage.removeItem on successful logout', () => {
      testInitialState.isAuthenticated = true;
      testInitialState.user = { _id: 'user1' } as User; 
      testInitialState.accessToken = 'someToken';
      testInitialState.refreshToken = 'someRefreshToken';

      const nextState = authReducer(testInitialState, logoutUserSuccess());
      expect(nextState.loading).toBe(false);
      expect(nextState.isAuthenticated).toBe(false);
      expect(nextState.user).toBeNull();
      expect(nextState.accessToken).toBeNull();
      expect(nextState.refreshToken).toBeNull();
      expect(removeItemSpy).toHaveBeenCalledWith('user');
      expect(removeItemSpy).toHaveBeenCalledWith('accessToken');
      expect(removeItemSpy).toHaveBeenCalledWith('refreshToken');
      expect(removeItemSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('logoutUserFailure', () => {
    const error = 'Logout failed';
    it('should update state correctly on logout failure', () => {
      const nextState = authReducer(testInitialState, logoutUserFailure(error));
      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(error);
    });
  });

  describe('openSnackbar', () => {
    const payload = { message: 'Snackbar message!', severity: 'success' as const };
    it('should set snackbar properties correctly', () => {
      // Using direct action import if available, otherwise manual object:
      // const action = openSnackbar ? openSnackbar(payload) : { type: 'auth/openSnackbar', payload };
      const nextState = authReducer(testInitialState, openSnackbar(payload));
      expect(nextState.snackbar.open).toBe(true);
      expect(nextState.snackbar.message).toBe(payload.message);
      expect(nextState.snackbar.severity).toBe(payload.severity);
    });
  });

  describe('closeSnackbar', () => {
    it('should set snackbar.open to false and clear message/severity', () => {
      const openPayload = { message: 'Test', severity: 'info' as const };
      let openedState = authReducer(testInitialState, openSnackbar(openPayload));
      expect(openedState.snackbar.open).toBe(true);

      // const action = closeSnackbar ? closeSnackbar(undefined) : { type: 'auth/closeSnackbar' };
      const nextState = authReducer(openedState, closeSnackbar(undefined));
      expect(nextState.snackbar.open).toBe(false);
      expect(nextState.snackbar.message).toBeNull();
      expect(nextState.snackbar.severity).toBeNull();
    });
  });

  describe('setShowFriendsMenu', () => {
    it('should toggle showFriendsMenu from false to true', () => {
      const nextState = authReducer(testInitialState, setShowFriendsMenu());
      expect(nextState.showFriendsMenu).toBe(true);
    });

    it('should toggle showFriendsMenu from true to false', () => {
      testInitialState.showFriendsMenu = true;
      const nextState = authReducer(testInitialState, setShowFriendsMenu());
      expect(nextState.showFriendsMenu).toBe(false);
    });
  });

  describe('updateOnlineUsers', () => {
    const user1Payload: OnlineFriend = { _id: 'user1', firstName: 'John', lastName: 'Doe', avatar: 'avatar.png', onlineStatus: 'online' };
    const user2Payload: OnlineFriend = { _id: 'user2', firstName: 'Jane', lastName: 'Doe', avatar: 'avatar2.png', onlineStatus: 'online' };

    it('should add a new user if not in onlineFriends', () => {
      const nextState = authReducer(testInitialState, updateOnlineUsers(user1Payload));
      expect(nextState.onlineFriends).toHaveLength(1);
      expect(nextState.onlineFriends[0]).toEqual(user1Payload);
    });

    it('should update an existing user (e.g. onlineStatus, avatar, name)', () => {
      const initialUser1: OnlineFriend = { _id: 'user1', firstName: 'Johnny', lastName: 'Doey', avatar: 'old_avatar.png', onlineStatus: 'away' };
      testInitialState.onlineFriends = [initialUser1];
      const updatedPayload: OnlineFriend = { _id: 'user1', firstName: 'John', lastName: 'Doe', avatar: 'new_avatar.png', onlineStatus: 'online' };
      
      const nextState = authReducer(testInitialState, updateOnlineUsers(updatedPayload));
      expect(nextState.onlineFriends).toHaveLength(1);
      expect(nextState.onlineFriends[0]).toEqual(updatedPayload);
    });

    it('should add a second user correctly', () => {
      let intermediateState = authReducer(testInitialState, updateOnlineUsers(user1Payload));
      const finalState = authReducer(intermediateState, updateOnlineUsers(user2Payload));
      expect(finalState.onlineFriends).toHaveLength(2);
      expect(finalState.onlineFriends).toEqual(expect.arrayContaining([user1Payload, user2Payload]));
    });
  });

  describe('removeFriend', () => {
    const friendUser1: User = { _id: 'friend1', username: 'friendOne', firstName: 'Friend', lastName: 'One', email: 'f1@e.com', fullname: 'Friend One', avatar: 'a.png', role: 'STUDENT', gender: 'male', organizationId: 'org1', activityStatus: "" };
    const friendUser2: User = { _id: 'friend2', username: 'friendTwo', firstName: 'Friend', lastName: 'Two', email: 'f2@e.com', fullname: 'Friend Two', avatar: 'b.png', role: 'STUDENT', gender: 'female', organizationId: 'org1', activityStatus: "" };

    beforeEach(() => {
      testInitialState.friends = [friendUser1, friendUser2];
    });

    it('should remove an existing friend', () => {
      const nextState = authReducer(testInitialState, removeFriend({ friend_id: 'friend1' }));
      expect(nextState.friends).toHaveLength(1);
      expect(nextState.friends[0]._id).toBe('friend2');
    });

    it('should not change state if friend_id does not exist', () => {
      const nextState = authReducer(testInitialState, removeFriend({ friend_id: 'nonexistent' }));
      expect(nextState.friends).toHaveLength(2);
    });
  });

  describe('setLoading', () => {
    it('should set isLoading to the payload value (true)', () => {
      // const action = setLoading ? setLoading(true) : { type: 'auth/setLoading', payload: true };
      const nextState = authReducer(testInitialState, setLoading(true));
      expect(nextState.isLoading).toBe(true);
    });

    it('should set isLoading to the payload value (false)', () => {
      testInitialState.isLoading = true; 
      // const action = setLoading ? setLoading(false) : { type: 'auth/setLoading', payload: false };
      const nextState = authReducer(testInitialState, setLoading(false));
      expect(nextState.isLoading).toBe(false);
    });
  });

  describe('clearSearch', () => {
    it('should clear searchResults and searchCount', () => {
      (testInitialState.searchResults as User[]) = [{ _id: 'user1' } as User]; 
      testInitialState.searchCount = 1;
      // const action = clearSearch ? clearSearch(undefined) : { type: 'auth/clearSearch' };
      const nextState = authReducer(testInitialState, clearSearch(undefined));
      expect(nextState.searchResults).toEqual([]); 
      expect(nextState.searchCount).toBeNull();
    });
  });
});
