import Header from "../Header";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
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
const Channel = () => {
    const [channelList, setChannelList] = useState([]);

    useEffect(() => {
        load()
    }, []);

    function load() {
        Api.get('/channels/getAll').then(res => {
            setChannelList(res.data)
        })
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            Api.get('/channels/delete', {
                params: {
                    channels_id: id
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
                            <TableHeaderCell>Channel ID</TableHeaderCell>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Description</TableHeaderCell>
                            <TableHeaderCell>Action</TableHeaderCell>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {channelList.map((item) => (
                            <TableRow key={item.channel_id}>
                                <TableCell>{item.channel_id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>
                                    <DeleteButton onClick={() => handleDelete(item.channel_id)}>Delete</DeleteButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>

        </div>
    );
}

export default Channel;