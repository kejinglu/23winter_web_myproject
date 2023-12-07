import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Header from "../Header";
import Api from "../../../request";
import {useNavigate} from "react-router-dom";

const CreateChannelContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  padding: 8px;
  margin-bottom: 16px;
`;

const FormTextarea = styled.textarea`
  padding: 8px;
  margin-bottom: 16px;
  resize: vertical;
`;

const FormButton = styled.button`
  padding: 12px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const CreateChannel = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        Api.post('/channels/create', {
            name: name,
            description: description,
        }).then(res => {
            alert(res.message)
            navigate('/')
        })
    };

    return (
        <div>
            <Header/>
            <CreateChannelContainer>
                <h2>Create a New Channel</h2>
                <Form onSubmit={handleSubmit}>
                    <FormLabel>Name:</FormLabel>
                    <FormInput
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <FormLabel>Description:</FormLabel>
                    <FormTextarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <FormButton type="submit">Create Channel</FormButton>
                </Form>
            </CreateChannelContainer>
        </div>
    );
};

export default CreateChannel;
