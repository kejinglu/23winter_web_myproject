import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Header from "../Header";
import Api from "../../../request";
import dayjs from "dayjs";

const CardWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-between;
  padding: 20px;
`;

const Card = styled.div`
  width: calc(25% - 20px);
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 15px;
`;

const CardTitle = styled.a`
  font-size: 24px;
  color: #000;
  text-decoration: none;
`;
const SearchDiv = styled.div`
  width: 100%;
  margin-left: 10px;
  margin-top: 10px;
`;
const SearchInput = styled.input`
  width: 15%;
  padding: 10px;
  margin-bottom: 20px;
  margin-right: 10px;
`;
const SearchButton = styled.button`

`;
const CountDiv = styled.div`
  margin-bottom: 10px;
`;
const Search = () => {
    const [postList, setPostList] = useState([]);
    const [userId, setUserId] = useState('');
    const [content, setContent] = useState('');
    const [post, setPost] = useState({
        max: 0,
        min: 0,
    });
    const [comment, setComment] = useState({
        max: 0,
        min: 0,
    });
    useEffect(() => {
        function load() {
            Api.get('/users/searchPostsRank').then(res => {
                // setPostList(res);
                const data = res.data
                if (data && data.length > 0) {
                    if (data[0].post_count > data[1].post_count) {
                        setPost(
                          {
                              ...post,
                              max: data[0].user_id,
                              min: data[1].user_id
                          }
                        )
                    } else {
                        setPost(
                          {
                              ...post,
                              min: data[0].user_id,
                              max: data[1].user_id
                          }
                        )
                    }
                }
            });

            Api.get('/users/searchCommentsRank').then(res => {
                const data = res.data
                if (data && data.length > 0) {
                    if (data[0].comments_count > data[1].comments_count) {
                        setComment(
                            {
                                ...comment,
                                max: data[0].user_id,
                                min: data[1].user_id
                            }
                        )
                    } else {
                        setComment(
                            {
                                ...comment,
                                min: data[0].user_id,
                                max: data[1].user_id
                            }
                        )
                    }
                }
            });
        }

        load();
    }, []);

    function searchPostsByUserId() {

        Api.get('/users/searchUserPost', {
            params: {
                user_id: userId
            }
        }).then(res => {
            setPostList(res.data)
            setUserId('')
        })
    }

    function searchPostsByContent() {
        Api.get('/users/searchContent', {
            params: {
                query: content
            }
        }).then(res => {
            setPostList(res.data)
            setContent('')
        })
    }

    return (<div>
        <Header/>
        <SearchDiv>
            <CountDiv>
                <p>The user with the most posts: {post.max}</p>
                <p>The user with the fewest posts: {post.min}</p>
                <p>The user with the most comments: {comment.max}</p>
                <p>The user with the fewest comments: {comment.min}</p>
            </CountDiv>
            <div>
                <SearchInput
                    type="text"
                    placeholder="please input userId..."
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <SearchButton onClick={searchPostsByUserId}>Search</SearchButton>
            </div>
            <SearchInput
                type="text"
                placeholder="please input post content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <SearchButton onClick={searchPostsByContent}>Search</SearchButton>

        </SearchDiv>

        <CardWrapper>
            {postList && postList.length > 0 && postList.map((item) => (<Card key={item.post_id}>
                <a href={`/details/${item.post_id}`}>
                    <CardImage src={`http://localhost:3001/uploads/${item.img_name}`} alt={item.title}/>
                </a>
                <CardContent>
                    <CardTitle href={`/details/${item.id}`}>{item.title}</CardTitle>
                    <p>Published by: {dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                </CardContent>
            </Card>))}
        </CardWrapper>
    </div>);
};

export default Search;
