import React from "react";
import './navBar.scss'
import { Link } from "react-router-dom";
import Cate from "../components/pages/Cate";
import { useNavigate } from "react-router";



export default function NavBar() {
    const navigate = useNavigate()
    
    

    return (

        <div className="navbar">
            <div className="container">
                <div className="left">
                    <span href="https://ibb.co/y81kCvq"><img src="https://i.ibb.co/gDpW8qJ/image-2021-11-19-205212.png" alt="" /></span>
                    <span><Link to='/Browse' style={{ textDecoration: 'none', color: "white" }}>Home</Link></span>
                    <span><Link to='/Cate' component={Cate} style={{ textDecoration: 'none', color: "white" }}>Category</Link></span>
                    <span><Link to='/NewPop' style={{ textDecoration: 'none', color: "white" }}>New and popular</Link></span>
                    <span>My List</span>

                    <span className="mana"><Link to='/Manage' style={{ textDecoration: 'none', color: "white", }}>Manage</Link></span>
                    <span ><Link to='/Login' style={{ textDecoration: 'none', color: "white", }} >Log Out</Link></span>
                </div>
                   
                {/* <div className="right">
                    <span>Profile</span>
                    </div> */}



            </div >
        </div>

    )
}
