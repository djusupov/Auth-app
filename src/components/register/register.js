import React, { useState, useEffect } from 'react';
import './register.css'
import Cookie from 'js-cookie'


const Preregister = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState({
        user: '', lastName: ''
    })
    const base_url = 'https://nestjs-boilerplate-test.herokuapp.com/api/v1/';
    const onSubmit = (e) => {
        e.preventDefault()
        fetch(`${base_url}auth/email/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
                // "kjgadlja"
                // "ali@mail.com"
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            Cookie.set('token', data['token'])

            const token = Cookie.get('token')

            let headers = {
                "Content-Type": "application/json"
            }
            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            }
            fetch(`https://nestjs-boilerplate-test.herokuapp.com/api/v1/auth/me`, { headers, })
                .then(res => res.json())
                .then(data => {
                    setUser({
                        user: data.firstName,
                        lastName: data.lastName
                    })
                })

        })
    }
    // useEffect(() => {

    // }, []);
    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={onSubmit} >
                <h3>Login Here</h3>
                <h3>{user.user} {user.lastName}</h3>

                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Email or Phone" onChange={(e) => setEmail(e.target.value)} value={email} id="username" />

                <label htmlFor="password">Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" id="password" />

                <button type='submit' style={{ marginTop: '20px' }}>Log In</button>
                <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                </div>
            </form>
        </div>
    );
};

export default Preregister;