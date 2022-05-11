import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthLayout from "./layout/AuthLayout"
import PrivateLayout from "./layout/PrivateLayout"

import {
  Login,
  Register,
  ConfirmAccount,
  ForgotPassword,
  NewPassword,
  ManagePatients,
  EditProfile,
  ChangePassword
} from "./pages"

import { AuthProvider, PatientProvider } from "./context"

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />} key="public">
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="confirm-account/:id" element={<ConfirmAccount />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
            </Route>
            <Route path="/admin" element={<PrivateLayout />} key="private">
              <Route index element={<ManagePatients />} />
              <Route path="profile" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Routes>
        </PatientProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
