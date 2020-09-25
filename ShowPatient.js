import React, { Component } from "react";
import '../css/style.css';
import { Button, Form, Card } from 'react-bootstrap';
import web3 from '../web3';
import ipfs from '../ipfs';
import storehash from '../storehash';




class ShowStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentArray: [],

        };
    }

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        var array = new Array(); //전체 학생들 정보를 저장하기 위한 임시 배열
        var array2 = new Array(); //전체 학생들 중 특정 과목과 성별을 만족하는 학생들을 필터링하여 저장하기 위한 임시 배열

        const totalStudents = await storehash.methods.getNumOfStudents().call({
            from: accounts[0]
        });

        for (var i = 0; i < totalStudents; i++) {
            const studentInfo = await storehash.methods.getStudentInfo(i).call({
                from: accounts[0]
            });
            array.push(studentInfo);
        }
        this.setState({
            studentArray: array
        })
        this.state.studentArray.map(students => {
            console.log(students[0]); //학생 이름

            if (students[1] == this.props.match.params.gender && students[4] == this.props.match.params.subject) {
                array2.push(students);
            }


        })
        this.setState({
            studentArray: array2
        })
        console.log(this.state.studentArray)


    }









    render() {

        return (
            <div>
                <div>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>
                                <ul className="nav navbar-nav navbar-right">
                                <li><a><strong>{sessionStorage.getItem('account')}</strong>님 반갑습니다!</a></li>
                                <li><a href="/logout">로그아웃</a></li>
                                </ul>
                        </div>
                    </nav>

                </div>
                <div class="section">
                    <div class="header">
                        <h2>내 건강 진단 리스트</h2>
                    </div>

                    
                        {this.state.studentArray.map(students => (
                            <div class="col-lg-4">

                                <div class="card">



                                    <div class="card-image"></div>
                                    <div class="card-title">이름 : {students[0]}</div>
                                    <div class="card-comment">성별 : {students[1]}</div>
                                    <div class="card-comment">나이 : {students[2]}</div>
                                    <div class="card-comment">거주지 : {students[3]}</div>
                                    

                                    <hr></hr>


                                    <button class="btn btn-info newapply-btn" onClick={()=>{
                                        storehash.methods.getStudentResume(students[5]).send({
                                            from: sessionStorage.getItem('account'),
                                            value: web3.utils.toWei('5', "ether"),
                                        }).then((result)=>{
                                            console.log(result);
                                            window.location.href="http://gateway.ipfs.io/ipfs/"+`${students[5]}`;
                                        })
                                        
                                    }} >학생 이력서 다운로드</button>
                                </div>



                            </div>
                        ))}



                   
                </div>
            </div>
        )
    }
}


export default ShowStudent;
