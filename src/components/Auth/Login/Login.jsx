import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../../../config.js'

const Login = () => {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    });

    const submit = (e) => {
        e.preventDefault();

        fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })
        .then((res) => {
            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error("User not found");
                } else {
                    throw new Error("Login failed");
                }
            }
            
            return res.json();
        })
        .then((data) => {
            console.log("Login successful");
            console.log(data);

            navigate('/');
        })
        .catch((error) => {
            console.error(error);
        });

        setFormValues({
            username: '',
            password: ''
        });
        
    };



    return (
        <div className="h-full w-full flex justify-around items-center">
            <h1 className="text-6xl text-blue-500">LOGIN PAGE</h1>
            <div className="flex flex-col items-start">
                <div className="p-8 border-2 rounded-md">
                    <form onSubmit={submit} className="flex flex-col gap-3">
                        <div className="flex flex-col items-start">
                            <label htmlFor="">Username</label>
                            <input
                                onChange={(e) => setFormValues((prevState) => ({...prevState, username: e.target.value}) )} 
                                value={formValues.username}
                                type="text" 
                                className="w-80 h-8 p-2 bg-gray-300 text-black rounded-md"/>
                        </div>
                        <div className="flex flex-col items-start">
                            <label htmlFor="">Password</label>
                            <input
                                onChange={(e) => setFormValues((prevState) => ({...prevState, password: e.target.value}) )}  
                                value={formValues.password}
                                type="password" 
                                className="w-80 h-8 p-2 bg-gray-300 text-black rounded-md"/>
                        </div>
                        <div className="flex items-center justify-end">
                            <input type="submit" className="bg-blue-500 px-2 py-1 font-semibold rounded-md cursor-pointer hover:bg-blue-600"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Login;