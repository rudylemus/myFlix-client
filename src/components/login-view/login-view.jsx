import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props){
    const [username, setUsername] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
     /* Send a request to the server for authentication */
  axios.post('https://myflixmoviedb.herokuapp.com/login', {
    Username: username,
    Password: password
  })
  .then(response => {
    const data = response.data;
    props.onLoggedIn(data);
  })
  .catch(e => {
    console.log('no such user')
  });
};
  
    return (
      <Form>
        <h2 className="mb-3 mx-auto mt-5">Login to myFlix</h2>
        <Form.Group className="mb-3 mx-auto mt-4" controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter a username"
          />
        </Form.Group>
  
        <Form.Group className="mb-3 mx-auto mt-4">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
            placeholder=""
          />
        </Form.Group>
  
        <Button className="mt-4" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
  
  LoginView.PropTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
  };