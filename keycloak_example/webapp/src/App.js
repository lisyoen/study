import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                //const response = await axios.get('http://localhost:3000/api/v1/users');
                const response = await axios.get('http://localhost:8000/users', {
                  headers: {
                      Authorization: `Bearer ${keycloak.token}`
                  }
                });
                //res.json(response.data);
                setUsers(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        // Keycloak 인증 후 세션 확인 및 사용자 목록 로드
        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
