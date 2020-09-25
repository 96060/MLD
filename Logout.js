import React, { Component } from "react";
import '../css/style.css';
import { Link } from 'react-router-dom';



class Logout extends Component {


    render() {

        return (
            <div className="login-section">
                <div className="header">
                    <h1>LogOut</h1>
                    <h2>로그아웃 되었습니다</h2>

                    {sessionStorage.removeItem('account')}

                    <li><Link to="/"><h2>메인페이지로 이동(클릭)</h2></Link></li>
                    <hr></hr>
                </div>
            </div>
        )

    }
}

export default Logout;
