import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Header from "../Header";
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

const User = () => {
    // Example data
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        load()
    }, []);

    function load() {
        Api.get('/users/getAll').then(res => {
            setUserList(res)
        })
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            Api.post('/users/delete', {
                user_id: id
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
                            <TableHeaderCell>User ID</TableHeaderCell>
                            <TableHeaderCell>Username</TableHeaderCell>
                            <TableHeaderCell>Nickname</TableHeaderCell>
                            <TableHeaderCell>Password</TableHeaderCell>
                            <TableHeaderCell>Is Admin</TableHeaderCell>
                            <TableHeaderCell>Action</TableHeaderCell>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {userList.map((item) => (
                            <TableRow key={item.user_id}>
                                <TableCell>{item.user_id}</TableCell>
                                <TableCell>{item.username}</TableCell>
                                <TableCell>{item.nickname}</TableCell>
                                <TableCell>{item.password}</TableCell>
                                <TableCell>{item.is_admin == 1 ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <DeleteButton onClick={() => handleDelete(item.user_id)}>Delete</DeleteButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>

        </div>
    );
};

export default User;
