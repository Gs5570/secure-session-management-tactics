import Users from '../components/Users';

import Navbar from "../components/Navbar"
export default function AdminPage (){
    return(
        <>
            <Navbar />
            <h1> Welcome to the Admin page</h1>
            <br />
            <Users />
            <br />

        </>
    )
}