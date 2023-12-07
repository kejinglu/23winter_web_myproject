import React, {useState} from 'react';
import styled from 'styled-components';
import Api from "../../request";
import {useNavigate} from "react-router-dom";

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
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
const RegisterDiv = styled.div`
  margin-top: 2px;
  text-align: right;
`;
const RegisterA = styled.a`
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        Api.post('/users/login', {
            username: username,
            password: password
        }).then(res => {
            console.log(res)

            if (res.code === "ERR_BAD_REQUEST") {
                alert(res.response.data.message)
            }
            if (res.data) {
                localStorage.setItem("user", JSON.stringify(res.data))
                if(res.data.is_admin===1){
                    navigate('/user')
                }else{
                    navigate('/')
                }
            }
        })


    };
    return (
        <LoginWrapper>
            <LoginForm onSubmit={handleSubmit}>
                <h2>Login</h2>
                <InputField
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <SubmitButton type="submit">Login</SubmitButton>
                <RegisterDiv>
                    <RegisterA href={'/register'}>register</RegisterA>
                </RegisterDiv>
            </LoginForm>
        </LoginWrapper>
    );
};

export default Login;
