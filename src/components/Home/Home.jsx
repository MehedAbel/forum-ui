import { useEffect, useState } from "react";
import { API_URL } from "../../config.js";

const Home = () => {

    const url = `${API_URL}`;
    const [users, setUsers] = useState([]);

    const loadUsersList = async () => {
        fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.length > 0) {
                    const tempData = [];
                    data.forEach((item) => {
                        tempData.push({
                            id: item.id,
                            username: item.username,
                            email: item.email
                        });
                    });
                    setUsers(tempData);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log("Something went wrong ey!")
            });
    };

    useEffect(() => {
        loadUsersList();
    }, []);

    return (
        <div>
            <h1>Home, the API URL is: {url}</h1>
            <h1>Home, the URL is THERE?</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.id} - {user.username} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;