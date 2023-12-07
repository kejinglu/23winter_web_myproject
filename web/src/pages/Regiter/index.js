import React, {useState} from 'react';
import styled from 'styled-components';
import Api from "../../request";
import {useNavigate} from "react-router-dom";

const RegisterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const RegisterForm = styled.form`
  background-color: #fff;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75em;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const LoginDiv = styled.div`
  margin-top: 2px;
  text-align: right;
`;
const LoginA = styled.a`
`;

const Register = () => {
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        Api.post('/users/register', {
            username: username,
            nickname: nickname,
            password: password
        }).then(res => {
            if (res.code === "ERR_BAD_REQUEST") {
                alert(res.response.data.message)
            }
            if (res.message) {
                navigate('/login')
            }
        })


    };
    return (
        <RegisterWrapper>
            <RegisterForm onSubmit={handleSubmit}>
                <h2>Register</h2>
                <InputField
                    type="text"
                    placeholder="Username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    type="text"
                    placeholder="Nickname"
                    required
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <SubmitButton type="submit">Register</SubmitButton>
                <LoginDiv>
                    <LoginA href={'/login'}>login</LoginA>
                </LoginDiv>
            </RegisterForm>
        </RegisterWrapper>
    );
};

export default Register;
