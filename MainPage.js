import React, { Component } from "react";
import '../css/style.css';
import { Button, Form } from 'react-bootstrap';
import web3 from '../web3';
import ipfs from '../ipfs';
import storehash from '../storehash';

class registerPatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            age: "",
            residence: "",
            subject: "",
            gender: "",
            ipfsHash: "waiting..",
            buffer: "waiting.."
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    captureFile = (event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
    };

    convertToBuffer = async (reader) => {
        //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
        //set this buffer -using es6 syntax
        this.setState({ buffer });
    };




    handleSubmit = async (e) => {
        e.preventDefault();
        const account = sessionStorage.getItem('account');

        if (account != null) {
            const ipfsHash=await ipfs.add(this.state.buffer);
            this.setState({ ipfsHash: ipfsHash[0].hash });
            
            const transactionHash=await storehash.methods.registerPatient(this.state.name, this.state.gender, this.state.age, this.state.hight, this.state.weight, this.state.ipfsHash).send({
                from: account
            });
            alert("등록되었습니다!");
            window.location.href = '/RegisterPatient';


        } else {
            alert("로그인 먼저 해 주세요!")
            window.location.href = '/PatientLogin';
        }

    } //onClick




    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-middle">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="/FindTutor">리워드</a>
                            </div>

                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav">
                                    <li><a href="/registerPatient">문진기록표</a></li>

                                </ul>

                                <ul className="nav navbar-nav navbar-right">
                                <li><a><strong>{sessionStorage.getItem('account')}</strong>님 반갑습니다!</a></li>
                                <li><a href="/logout">로그아웃</a></li>
                                </ul>

                            </div>
                        </div>
                    </nav>

                </div>

                <div className="section">
                    <div className="header">
                        <h2>Main Home Page</h2>
                    </div>
                </div>


            </div>
        )

    }

}

export default registerPatient;
