import React, { Component } from 'react';
import api from '../api'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { PostsList, MoviesInsert, MoviesUpdate} from '../pages'


class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      submit: false,
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }
  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }
    console.log("Credentials Submitted");
    this.auth(this.state.username, this.state.password);
    return
  }

  auth = async (username, password) => {
    await api.authUser(username, password).then(res => {
        console.log(res.data.data);
        //window.alert(res.data);
        if(res.data.data !== 0){
            window.alert('You are logged in');
           console.log(res.data.data._id);
            localStorage.setItem('userName', res.data.data.name);      
            this.setState({ submit:  true});
        } else {
            this.setState({ error: 'Incorrect Credentials' });
        }
    })
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {
    if (!this.state.submit){
    return (
        <Form onSubmit={this.handleSubmit} style={{marginLeft: 400, width: 300}} >
        <Form.Group controlId="LoginPage">
            <Form.Label>Username</Form.Label>
            <Form.Control type="string" placeholder="Enter Username" value={this.state.username} onChange={this.handleUserChange} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    
    )
    } 
        return (
        <h3>You are logged in! </h3>
        )        
  }
}

export default LoginPage;