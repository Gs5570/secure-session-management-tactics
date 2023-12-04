import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'

//pages
import Login from './pages/Login'
import Register from './pages/register'
import Admin from './pages/Admin'
import Unauthorized from './pages/Unauthorized'
import GuessPage from './pages/GuessPage'
import BookingTickets from './pages/BookingTickets'
import AdminPage from './pages/AdminPage'
import Missing from './pages/Missing'


const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

import './App.css'


function App() {
 
  return (
    <Routes>
      <Route path="/" element = {<Layout />}>
        {/**public routes */}
        <Route index element={<Login />} />
        <Route path="login" element = { <Login /> }/>
          <Route path="register" element = { <Register /> }/>
          <Route path="adminLogin" element = { <Admin /> }/>
          <Route path="unauthorized" element = { <Unauthorized /> }/>
        <Route path="guessPage" element = { <GuessPage /> }/>

        {/* private route */}
        {/** protect the route if the user are logged in */}
        <Route element = {<RequireAuth allowedRoles={[ROLES.User]} />}> 
          <Route path="bookingTickets" element = { <BookingTickets /> }/>
        </Route> 

        {/** protect the route if the user are logged in */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="adminPage" element = { <AdminPage /> }/>
        </Route>

        {/* <Route path="bookingTickets" element = { <BookingTickets /> }/>
        <Route path="adminPage" element = { <AdminPage /> }/> */}
        

        {/* cath all */}
        <Route path="*" element = { <Missing /> }/>

      </Route>
    </Routes> 
  )
}

export default App
