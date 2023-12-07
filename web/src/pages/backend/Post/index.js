import Header from "../Header";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import Api from "../../../request";

const TableContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #3498db;
  color: #fff;
`;

const TableHeaderCell = styled.th`
  text-align: left;
  padding: 10px;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
`;
const Post = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        load()
    }, []);

    function load() {
        Api.get('/posts/getAll').then(res => {
            setPostList(res)
        })
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            Api.get('/posts/delete', {
                params: {
                    post_id: id
                }
            }).then(res => {
                load()
            })
        }
    };

    return (
        <div>
            <Header/>
            <TableContainer>
                <StyledTable>
                    <TableHead>
                        <tr>
                            <TableHeaderCell>Post ID</TableHeaderCell>
                            <TableHeaderCell>User ID</TableHeaderCell>
                            <TableHeaderCell>Channel ID</TableHeaderCell>
                            <TableHeaderCell>Title</TableHeaderCell>
                            <TableHeaderCell>Image</TableHeaderCell>
                            <TableHeaderCell>Content</TableHeaderCell>
                            <TableHeaderCell>Likes</TableHeaderCell>
                            <TableHeaderCell>Dislikes</TableHeaderCell>
                            <TableHeaderCell width={'100px'}>Created At</TableHeaderCell>
                            <TableHeaderCell>Action</TableHeaderCell>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {postList.map((item) => (
                            <TableRow key={item.post_id}>
                                <TableCell>{item.post_id}</TableCell>
                                <TableCell>{item.user_id}</TableCell>
                                <TableCell>{item.channel_id}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>
                                    {item.img_name &&
                                        <Image src={`http://localhost:3001/uploads/${item.img_name}`} alt=""/>}
                                </TableCell>
                                <TableCell>{item.content}</TableCell>
                                <TableCell>{item.likes}</TableCell>
                                <TableCell>{item.dislikes}</TableCell>
                                <TableCell>{dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                                <TableCell>
                                    <DeleteButton onClick={() => handleDelete(item.post_id)}>Delete</DeleteButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>

        </div>
    );
}

export default Post;