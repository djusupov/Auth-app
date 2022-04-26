import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
// import {} Form
import Cookie from 'js-cookie'
function MyVerticallyCenteredModal(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const base_url = 'https://nestjs-boilerplate-test.herokuapp.com/api/v1/';
    // const state = {
    //     email,
    //     password,
    //     firstName,
    //     lastName,
    // }
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(state)
        console.log(e)
        fetch(`${base_url}auth/email/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            // const token = Cookie.get('token')
            // let headers = {
            //     "Content-Type": "application/json"
            // }
            // if (token) {
            //     headers['Authorization'] = `Bearer ${token}`
            // }
        })
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="#email">email</label>
                    <input type="email" name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="/email" /><br />
                    <label htmlFor="#pass">password</label>
                    <input type="text"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id='/pass' /><br />
                    <label htmlFor="#email">name</label>
                    <input type="text" name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        id="/email" /><br />
                    <label htmlFor="#email">lastname</label>
                    <input type="text" name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        id="/email" /><br />
                    <Button variant="primary" type='submit' >
                        Register
                    </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
function MyVerticallyCenteredModall(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("")
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
            fetch(`https://nestjs-boilerplate-test.herokuapp.com/api/v1/auth/me`, { headers, }).then(res => res.json()).then(data => setUser(data['firstName']))
        })

        // fetch(`${base_url}auth/me`, {
        //     method: 'GET',
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        // })
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit}>
                    <h1>login</h1>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <h1>password</h1>
                    <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <Button variant="primary" type='submit' >
                        Register
                    </Button>
                    <h1>{user}</h1>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const Auth = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [modallShow, setModallShow] = React.useState(false);
    return (
        <div>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Register
            </Button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <>
                <Button variant="primary" onClick={() => setModallShow(true)}>
                    login
                </Button>

                <MyVerticallyCenteredModall
                    show={modallShow}
                    onHide={() => setModallShow(false)}
                />
            </>
        </div>
    );
};

export default Auth;