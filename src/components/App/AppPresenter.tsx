import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Login from '../../Routes/Login'
import PhoneLogin from '../../Routes/PhoneLogin'
import VerifyPhone from '../../Routes/VerifyPhone'
import SocialLogin from '../../Routes/SocialLogin'
import Home from '../../Routes/Home'
import Ride from '../../Routes/Ride'
import EditAccount from '../../Routes/EditAccount'
import Settings from '../../Routes/Settings'
import Places from '../../Routes/Places'
import AddPlace from '../../Routes/AddPlace'
import FindAddress from '../../Routes/FindAddress'
import { IS_LOGGED_IN } from './AppQueries'

const AppPresenter: React.FC = () => {
  const { data } = useQuery(IS_LOGGED_IN);

  console.log(data.isLoggedIn, 'data.isLoggedIn')
  return <Router>{data.isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>
}

const LoggedInRoutes: React.FC = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path="/ride" element={<Ride />} />
    <Route path="/edit-account" element={<EditAccount />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/places" element={<Places />} />
    <Route path="/add-place" element={<AddPlace />} />
    <Route path="/find-address" element={<FindAddress />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
)

const LoggedOutRoutes: React.FC = () => (
  <Routes>
    <Route index element={<Login />} />
    <Route path="/phone-login" element={<PhoneLogin />} />
    <Route path="/verify-phone" element={<VerifyPhone />} />
    <Route path="/social-login" element={<SocialLogin />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
)

export default AppPresenter
