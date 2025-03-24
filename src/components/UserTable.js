import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/users").then((res) => setUsers(res.data));
    }, []);

    const handleAction = (action) => {
        axios.post(`http://localhost:8000/api/users/${action}`, { userIds: selectedUsers }).then(() => {
            setUsers(users.filter((u) => !selectedUsers.includes(u._id)));
            setSelectedUsers([]);
        });
    };

    return (
        <div>
            <Button onClick={() => handleAction("block")}>Block</Button>
            <Button onClick={() => handleAction("unblock")}>Unblock</Button>
            <Button onClick={() => handleAction("delete")}>Delete</Button>

            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Last Seen</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td><input type="checkbox" onChange={() => setSelectedUsers([...selectedUsers, user._id])} /></td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{new Date(user.lastSeen).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserTable;
