import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Header from "../Header";
import Api from "../../../request";
import {useNavigate} from "react-router-dom";

const PostFormContainer = styled.div`
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

const FormSelect = styled.select`
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

const CreatePost = () => {
    const [channelId, setChannelId] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [channelList, setChannelList] = useState([])
    const navigate = useNavigate();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    useEffect(() => {
        function load() {
            Api.get('/channels/getAll').then(res => {
                setChannelList(res.data)
            })
        }

        load()
    }, []);
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        let forms = new FormData()
        forms.append("file", selectedImage)
        // Handle image upload logic
        Api.post('/upload', forms).then(res => {
            setImage(res.filename)
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (channelId && channelId !== 0){
            Api.post('/posts/create', {
                user_id: user.user_id,
                channel_id: channelId,
                title: title,
                content: content,
                img_name: image,
            }).then(res => {
                alert(res.message)
                navigate('/')
            })
        }

    };

    return (
        <div>
            <Header/>
            <PostFormContainer>
                <h2>Create a New Post</h2>
                <Form onSubmit={handleSubmit}>
                    <FormLabel>Channel ID:</FormLabel>
                    <FormSelect
                        value={channelId}
                        onChange={(e) => setChannelId(e.target.value)}
                    >
                        <option key="" value="">----------Please select-------------</option>

                        {channelList.map(item => (
                            <option key={item.channel_id} value={item.channel_id}>{item.name}</option>
                        ))}
                    </FormSelect>

                    <FormLabel>Title:</FormLabel>
                    <FormInput
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <FormLabel>Content:</FormLabel>
                    <FormTextarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />

                    <FormLabel>Image:</FormLabel>
                    <FormInput
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <FormButton type="submit">Post</FormButton>
                </Form>
            </PostFormContainer>
        </div>
    );
};

export default CreatePost;
