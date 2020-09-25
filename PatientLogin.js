import React, { Component } from "react";
import '../css/style.css';
import { Button, Form } from 'react-bootstrap';
import web3 from '../web3';
import ipfs from '../ipfs';
import storehash from '../storehash';
import './LoginForm.css';





class PatientLogin extends Component {


  constructor(props) {
    super(props);
    this.state = {
      eth_account: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      eth_account: e.target.value
    });
  }



  onSubmit = async (e) => {
    e.preventDefault();
    
    const accounts = await web3.eth.getAccounts();

    if(this.state.eth_account==accounts){
      try{
        // console.log(account);
        sessionStorage.setItem("account", accounts[0]);
    }catch(e){
        console.log('error' +e);
    }
    }
    else{
      alert("유효하지 않은 계정입니다. 현재 블록체인 네트워크에 연결된 계정을 입력하세요!")
      window.location.href = '/PatientLogin';
    }

  } //onClick



  render() {

    return (

      <div className="login-section">
        <div className="header">
          <h1>Login</h1>
          <h2>로그인</h2>
          <hr></hr>
        </div>
        <Form className="login-form" onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>이더리움 계좌로 로그인</Form.Label>

            <Form.Control type="text" placeholder=" 현재 이더리움 네트워크에 연결된 계좌를 입력하세요" value={this.state.eth_account} onChange={this.handleChange} />


          </Form.Group>

          <Button variant="primary" type="submit" onClick=''>
            제출
            {/* 로그인 완료시 MainPage로 이동 */}
      </Button>
        </Form>
      </div>
    )

  }
}




export default PatientLogin;
