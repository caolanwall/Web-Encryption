import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-Group',
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
function createKey(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 };

class GroupCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            groupname: '',
            username: '',
            key: '',
        }
    }



    handleChangeInputGroupname = async event => {
        const groupname = event.target.value
        this.setState({ groupname })
    }

    handleIncludeGroup = async () => {
        const { groupname } = this.state
        var name = localStorage.getItem('userName');
        const key = createKey(20);
        console.log(key);
        await api.createGroup(name, groupname, key).then(res => {
            if(res.data.data !== 0 ){
                window.alert(`Group created successfully`)
            } else {
                window.alert(`Unable to create group`)
            }
            console.log(res.data);
            this.setState({
                name: '',
                group: '',
            })
        })
    }

    render() {
        const {groupname} = this.state
                
        return (
            <Wrapper>
                <Title>Create a Group</Title>

        <Label>Group Name: </Label>
            <InputText
                    type="text"
                    value={groupname}
                    onChange={this.handleChangeInputGroupname}
                />

                <Button onClick={this.handleIncludeGroup}>Create a Group</Button>
                <CancelButton href={'/Groups/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default GroupCreate