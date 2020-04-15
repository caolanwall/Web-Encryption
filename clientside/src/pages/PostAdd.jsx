import React, { Component } from 'react'
import api from '../api'
import DropdownButton from 'react-bootstrap/Dropdown'
import Dropdown from 'react-bootstrap/Dropdown'

import styled from 'styled-components'
//import { DropdownButton } from 'react-bootstrap'
var CryptoJS = require("crypto-js");
var sizes = [];

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-Post',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class PostAdd extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            content: '',
            Post: '',
            dropdown: [],
            selection: '',
        }
    }
 
    componentDidMount() {
        this.generateSelector();
    }

    handleSelect = async event => {
        console.log(event);
        this.setState({ selection: event})
        this.setState({ dropdown: ''})
        //this.setState({ content })
    }
    encrypt = async(group, content) => {
        var ciphertext
        await api.getGroup(group).then(res => {
            console.log(res)
            console.log(res.data.data[0].key)
            const key = res.data.data[0].key
            ciphertext = CryptoJS.AES.encrypt(content, key).toString();
            var bytes  = CryptoJS.AES.decrypt(ciphertext, key);
            var decryptedData = (bytes.toString(CryptoJS.enc.Utf8));
            console.log(ciphertext);
            console.log(decryptedData)

        })
        return(ciphertext);
    }

    getGroups = async () => {
        var name = localStorage.getItem('userName');
        await api.getGroups(name).then(res => {
            for(let i = 0; i < res.data.data.length; i++){
                sizes.push(res.data.data[i]);
                console.log(res.data.data[i])
            }
            
            console.log(res)
        })
        return sizes;
    }

    generateSelector = async () =>  {
        const { selection} = this.state
        var arr = await this.getGroups();
        var x = [];
        console.log(arr)
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            console.log(str)
            var element = (
                <Dropdown.Item eventKey={str} name={str} value={selection} onSelect={this.handleSelect}>{arr[i]}</Dropdown.Item>
            )
            x.push(element);
        }
        this.setState({ dropdown: x })
    }


    handleChangeInputContent = async event => {
        const content = event.target.value
        this.setState({ content })
    }

    handleIncludePost = async () => {
        const { content} = this.state
        var name = localStorage.getItem('userName');
        console.log(content)
        var group = this.state.selection;
        console.log(group)
        var encrypted = await this.encrypt(group, content);
        await api.createPost(name, encrypted, group).then(res => {
            window.alert(`Post inserted successfully`)
            this.setState({
                name: '',
                rating: '',
                time: '',
            })
        })
    }

    render() {
        const {content, selection} = this.state
        var out = localStorage.getItem('userName');
        return (
            <Wrapper>
                <Title>Create Post</Title>

                <Label>Name: {out}</Label>
                <h3>
                    {'\n'}
                </h3>

                <Label>Select a Group: {selection}</Label>
                <DropdownButton title="Dropdown button" value={selection} > {this.state.dropdown} </DropdownButton>

                <Label>Post Content: </Label>
                <InputText
                    type="text"
                    value={content}
                    onChange={this.handleChangeInputContent}
                />

                <Button onClick={this.handleIncludePost}>Add Post</Button>
                <CancelButton href={'/Posts/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default PostAdd