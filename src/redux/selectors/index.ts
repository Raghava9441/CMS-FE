import { useSelector  } from 'react-redux'
import { RootState } from '../store'

const isAuthenticated = (state: RootState) => state.auth.isAuthenticated
const user = (state: RootState) => state.auth.user
