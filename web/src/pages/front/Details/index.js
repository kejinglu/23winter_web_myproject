// Details.js
import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import Header from "../Header";
import {useParams} from "react-router-dom";
import Api from "../../../request";
import dayjs from "dayjs";

const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  width: 80%;
  max-width: 800px;
`;

const Head = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const Time = styled.p`
  margin-top: 10px;
  text-align: right;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-top: 20px;
`;

const BodyContent = styled.div`
  padding: 20px;
`;

const CommentContainer = styled.div`
  margin-top: 20px;
`;

const CommentForm = styled.form`
  display: flex;
  margin-bottom: 10px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  margin-right: 10px;
`;
const ImageInput = styled.input`
  padding: 8px;
  margin-bottom: 16px;
`;
const CommentButton = styled.button`
  padding: 8px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 10px;
    border: 1px solid #ccc;
`;

const CommentItem = styled.li`
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
`;

const CommentReply = styled.a`
  margin-left: 10px;
  color: #182fff;
    
`;

const CommentChildrenItem = styled.div`
    margin-left: 40px;
    margin-bottom: 10px;
`;

const CommentImage = styled.img`
  width: 30px;
  height: 30px;
`;
const LikeDislikeButtons = styled.div`
  display: flex;
  text-align: right;
  margin-top: 8px;
`;

const LikeButton = styled.a`
  margin-right: 8px;
  //background-color: #27ae60;
  //color: #fff;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
`;

const DislikeButton = styled.a`
  //background-color: #e74c3c;
  //color: #fff;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
`;
const Details = () => {
    const [commentValue, setCommentValue] = useState('');
    const [commentReplyValue, setCommentReplyValue] = useState('');
    const [comments, setComments] = useState([]);
    const [image, setImage] = useState('');
    const [replyImage, setReplyImage] = useState('');
    const [pid, setPid] = useState(0);
    const [post, setPost] = useState({});
    const img = useRef(null)
    const replyImg = useRef(null)
    const [replyTo, setReplyTo] = useState(null);
    const params = useParams()
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}

    useEffect(() => {
        load();
    }, []);

    function load() {
        Api.get('/posts/byID', {
            params: {
                post_id: params.id
            }
        }).then(res => {
            setPost(res)
        })

        Api.get('/comments/getComment', {
            params: {
                post_id: params.id
            }
        }).then(res => {
            setComments(res.data)
        })
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentValue && commentValue !== '') {
            Api.post('/comments/create', {
                user_id: user.user_id,
                post_id: params.id,
                parent_comment_id: pid,
                content: commentValue,
                img_name: image === '' ? '' : image
            }).then(res => {
                load()
                setImage('')
                img.current.value = ''
                setCommentValue('')
            })
        }
    };


    const handleCommentReplySubmit = (e) => {
        e.preventDefault();
        if (commentReplyValue && commentReplyValue !== '') {
            Api.post('/comments/create', {
                user_id: 1,
                post_id: params.id,
                parent_comment_id: replyTo,
                content: commentReplyValue,
                img_name: replyImage === '' ? '' : replyImage
            }).then(res => {
                load()
                setReplyImage('')
                replyImg.current.value = ''
                setCommentReplyValue('')
            })
        }
    };
    const handleCommentReply = (name) => {
        setReplyTo(name);
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        let forms = new FormData()
        forms.append("file", selectedImage)
        // Handle image upload logic
        Api.post('/upload', forms).then(res => {
            setImage(res.filename)
        })
    };
    const handleReplyImageChange = (e) => {
        const selectedImage = e.target.files[0];
        let forms = new FormData()
        forms.append("file", selectedImage)
        // Handle image upload logic
        Api.post('/upload', forms).then(res => {
            setReplyImage(res.filename)
        })
    };

    const handleLike = () => {
        Api.post('/posts/like', {
            post_id: params.id
        }).then(res => {
            load()
        })
    };

    const handleDislike = () => {
        Api.post('/posts/dislike', {
            post_id: params.id
        }).then(res => {
            load()
        })
    };

    return (
        <div>
            <Header/>
            <DetailWrapper>
                <ContentContainer>
                    <Head>
                        <Title>{post.title}</Title>
                        <Time>{dayjs(post.created_at).format("YYYY-MM-DD HH:mm:ss")}</Time>
                        <LikeDislikeButtons>
                            <div>
                                <LikeButton onClick={handleLike}>{`👍`}</LikeButton>
                                <span>{post.likes}</span>
                            </div>
                            <div>
                                <DislikeButton onClick={handleDislike}>👎</DislikeButton>
                                <span>{post.dislikes}</span>
                            </div>
                        </LikeDislikeButtons>
                    </Head>

                    <Image src={`http://localhost:3001/uploads/${post.img_name}`} alt=""/>
                    <BodyContent>
                        <p>{post.content}</p>
                        <CommentContainer>
                            <CommentForm onSubmit={handleCommentSubmit}>
                                <CommentInput
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={commentValue}
                                    onChange={(e) => setCommentValue(e.target.value)}
                                />
                                <CommentButton type="submit">Comment</CommentButton>
                            </CommentForm>
                            <ImageInput
                                type="file"
                                accept="image/*"
                                ref={img}
                                onChange={handleImageChange}
                            />
                            <CommentList>
                                {comments.map((item, index) => (
                                    <CommentItem key={index}>
                                        <strong>{item.user_id}:</strong>
                                        {item.content}
                                        {item.img_name ?
                                            <CommentImage src={`http://localhost:3001/uploads/${item.img_name}`}/> : ''}
                                        <CommentReply
                                            onClick={() => handleCommentReply(item.comment_id)}>Reply</CommentReply>
                                        {item.replies && (
                                            <CommentList>
                                                {item.replies.map((reply, replyIndex) => (
                                                    <CommentChildrenItem key={replyIndex}>
                                                        <strong>{reply.user_id}:</strong>
                                                        {reply.content}
                                                        {reply.img_name ? <CommentImage
                                                            src={`http://localhost:3001/uploads/${reply.img_name}`}/> : ''}
                                                    </CommentChildrenItem>
                                                ))}
                                            </CommentList>
                                        )}
                                        {replyTo === item.comment_id && (
                                            <div>
                                                <CommentForm onSubmit={(e) => handleCommentReplySubmit(e, item.name)}>
                                                    <CommentInput
                                                        type="text"
                                                        placeholder={`Add a comment...`}
                                                        value={commentReplyValue}
                                                        onChange={(e) => setCommentReplyValue(e.target.value)}
                                                    />
                                                    <CommentButton type="submit">Reply</CommentButton>
                                                </CommentForm>
                                                <ImageInput type="file" accept="image/*" ref={replyImg}
                                                            onChange={handleReplyImageChange}/>
                                            </div>
                                        )}
                                    </CommentItem>
                                ))}
                            </CommentList>
                        </CommentContainer>
                    </BodyContent>
                </ContentContainer>
            </DetailWrapper>

        </div>
    );
};

export default Details;
