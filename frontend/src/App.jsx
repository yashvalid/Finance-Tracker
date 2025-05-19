import React from 'react'
import { Layout } from './components/Layout'
import { FinanceProvider } from './context/FinanceContext'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import UserProtectedWrapper from './components/UserProtectedWrapper'
export function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
          <UserProtectedWrapper>
            <Layout />
          </UserProtectedWrapper>
        } />
      </Routes>
    </div>
  )
}
