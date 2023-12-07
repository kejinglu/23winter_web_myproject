import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Header from "../Header";
import Api from "../../../request";
import dayjs from "dayjs";

const CardWrapper = styled.div`
  width: 80%;
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

const CategoryList = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
`;

const CategoryItem = styled.div`
    margin-right: 20px;
    font-size: 16px;
    cursor: pointer;
    background: #96B97D;
    color: #fff;
    padding: 8px 12px;
    border-radius: 5px;

    &:hover {
        background: #6e8458;
    }

    &:last-child {
        margin-right: 0;
    }
`;

const Home = () => {
    const [postList, setPostList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        function load() {
            Api.get('/posts/getAll').then(res => {
                setPostList(res);
            });
            Api.get('/channels/getAll').then(res => {
                setCategoryList(res.data);
            });
        }

        load();
    }, []);

    const getPostListByChannelId = (channelId) => {
        Api.get('/channels/getType', {
            params: {
                channels_id: channelId
            }
        }).then(res => {
            setPostList(res.data);
        });
    }

    return (
        <div>
            <Header/>
            <CategoryList>
                {categoryList.map(item => (
                    <CategoryItem key={item.channel_id}
                                  onClick={() => getPostListByChannelId(item.channel_id)}>{item.name}</CategoryItem>
                ))}
            </CategoryList>
            <CardWrapper>
                {postList.map((item) => (
                    <Card key={item.post_id}>
                        <a href={`/details/${item.post_id}`}>
                            <CardImage src={`http://localhost:3001/uploads/${item.img_name}`} alt={item.title}/>
                        </a>
                        <CardContent>
                            <CardTitle href={`/details/${item.id}`}>{item.title}</CardTitle>
                            <p>Published by: {dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                        </CardContent>
                    </Card>
                ))}
            </CardWrapper>
        </div>
    );
};

export default Home;
