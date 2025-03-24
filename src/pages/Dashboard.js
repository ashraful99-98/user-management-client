// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Button } from "react-bootstrap";
// import { FaTrash, FaLock, FaUnlock } from "react-icons/fa";
// import "./Dashboard.css";

// const UserTable = () => {
//     const [users, setUsers] = useState([]);
//     const [selectedUsers, setSelectedUsers] = useState([]);

//     // Fetch users from backend
//     useEffect(() => {
//         axios.get("http://localhost:8000/api/users", { withCredentials: true })
//             .then((res) => setUsers(res.data))
//             .catch((err) => console.error("Error fetching users:", err));
//     }, []);

//     // Toggle user selection
//     const toggleSelection = (userId) => {
//         setSelectedUsers((prevSelected) =>
//             prevSelected.includes(userId)
//                 ? prevSelected.filter((id) => id !== userId)
//                 : [...prevSelected, userId]
//         );
//     };

//     // Handle block, unblock, delete actions
//     const handleAction = async (action) => {
//         if (selectedUsers.length === 0) return alert("No users selected!");

//         try {
//             let url = `http://localhost:8000/api/users`;
//             let method = "PUT";

//             if (action === "delete") {
//                 method = "DELETE";
//             } else if (action === "block") {
//                 url += "/block";
//             } else if (action === "unblock") {
//                 url += "/unblock";
//             }

//             await axios({
//                 method,
//                 url,
//                 data: { userIds: selectedUsers },
//                 withCredentials: true
//             });

//             setUsers(users.map(user =>
//                 selectedUsers.includes(user._id)
//                     ? { ...user, isBlocked: action === "block" }
//                     : user
//             ));

//             setSelectedUsers([]); // Clear selection after action
//         } catch (error) {
//             console.error(`Error performing ${action}:`, error);
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <div className="mb-3">
//                 <Button variant="warning" className="me-2" onClick={() => handleAction("block")}>
//                     <FaLock /> Block
//                 </Button>
//                 <Button variant="success" className="me-2" onClick={() => handleAction("unblock")}>
//                     <FaUnlock /> Unblock
//                 </Button>
//                 <Button variant="danger" onClick={() => handleAction("delete")}>
//                     <FaTrash /> Delete
//                 </Button>
//             </div>

//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>
//                             <input
//                                 type="checkbox"
//                                 onChange={(e) =>
//                                     setSelectedUsers(e.target.checked ? users.map(user => user._id) : [])
//                                 }
//                             />
//                         </th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Status</th>
//                         <th>Last Seen</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user) => (
//                         <tr key={user._id}>
//                             <td>
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedUsers.includes(user._id)}
//                                     onChange={() => toggleSelection(user._id)}
//                                 />
//                             </td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.isBlocked ? "Blocked" : "Active"}</td>
//                             <td>{new Date(user.lastLogin).toLocaleString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// };

// export default UserTable;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaLock, FaUnlock } from "react-icons/fa";
import "./Dashboard.css";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    // Fetch users from backend
    useEffect(() => {
        axios.get("http://localhost:8000/api/users", { withCredentials: true })
            .then((res) => setUsers(res.data.sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin))))
            .catch((err) => console.error("Error fetching users:", err));
    }, []);

    // Toggle user selection
    const toggleSelection = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    // Select/Deselect all users
    const toggleSelectAll = (isChecked) => {
        setSelectedUsers(isChecked ? users.map(user => user._id) : []);
    };

    // Handle block, unblock, delete actions
    const handleAction = async (action) => {
        if (selectedUsers.length === 0) return alert("No users selected!");

        try {
            let url = `http://localhost:8000/api/users`;
            let method = "PUT";

            if (action === "delete") {
                method = "DELETE";
            } else if (action === "block") {
                url += "/block";
            } else if (action === "unblock") {
                url += "/unblock";
            }

            await axios({
                method,
                url,
                data: { userIds: selectedUsers },
                withCredentials: true
            });

            setUsers(users.map(user =>
                selectedUsers.includes(user._id)
                    ? { ...user, isBlocked: action === "block" }
                    : user
            ));

            setSelectedUsers([]); // Clear selection after action
        } catch (error) {
            console.error(`Error performing ${action}:`, error);
        }
    };

    return (
        <div className="container">
            <div className="mb-3">
                <Button variant="warning" className="me-2" onClick={() => handleAction("block")}> <FaLock /> Block </Button>
                <Button variant="success" className="me-2" onClick={() => handleAction("unblock")}> <FaUnlock /> Unblock </Button>
                <Button variant="danger" onClick={() => handleAction("delete")}> <FaTrash /> Delete </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={(e) => toggleSelectAll(e.target.checked)}
                                checked={selectedUsers.length === users.length && users.length > 0}
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Last Seen</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user._id)}
                                    onChange={() => toggleSelection(user._id)}
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                            <td>{new Date(user.lastLogin).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserTable;

