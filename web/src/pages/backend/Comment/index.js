import Header from "../Header";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import Api from "../../../request";
import dayjs from "dayjs";

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
const Comment = () => {
    const [commentList,setCommentList] = useState([]);
    useEffect(() => {
        load()
    }, []);

    function load() {
        Api.get('/comments/getAll').then(res => {
            setCommentList(res)
        })
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            Api.get('/comments/delete', {
                params: {
                    comment_id: id
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
                            <TableHeaderCell>Comment ID</TableHeaderCell>
                            <TableHeaderCell>Content</TableHeaderCell>
                            <TableHeaderCell>User ID</TableHeaderCell>
                            <TableHeaderCell>Post ID</TableHeaderCell>
                            <TableHeaderCell>Parent Comment ID</TableHeaderCell>
                            <TableHeaderCell>Created At</TableHeaderCell>
                            <TableHeaderCell>Image</TableHeaderCell>
                            <TableHeaderCell>Action</TableHeaderCell>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {commentList.map((item) => (
                            <TableRow key={item.comment_id}>
                                <TableCell>{item.comment_id}</TableCell>
                                <TableCell>{item.content}</TableCell>
                                <TableCell>{item.user_id}</TableCell>
                                <TableCell>{item.post_id}</TableCell>
                                <TableCell>{item.parent_comment_id || '-'}</TableCell>
                                <TableCell>{dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                                <TableCell>
                                    {item.img_name && <Image src={`http://localhost:3001/uploads/${item.img_name}`} alt="" />}
                                </TableCell>
                                <TableCell>
                                    <DeleteButton onClick={() => handleDelete(item.comment_id)}>Delete</DeleteButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>

        </div>
    );
}

export default Comment;