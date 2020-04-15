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

class GroupAdd extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            group: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }
    handleChangeInputGroup = async event => {
        const group = event.target.value
        this.setState({ group })
    }

    handleIncludeGroup = async () => {
        const { name, group } = this.state
        await api.addToGroup(name, group).then(res => {
            if(res.data.data !== 0 ){
                window.alert(`Group member added successfully`)
            } else {
                window.alert(`Unable to add group member`)
            }
            console.log(res.data);
            this.setState({
                name: '',
                group: '',
            })
        })
    }

    render() {
        const {name, group} = this.state
                
        return (
            <Wrapper>
                <Title>Add a user to a group</Title>

        <Label>Username: </Label>
            <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />
                

                <Label>Group Name: </Label>
                <InputText
                    type="text"
                    value={group}
                    onChange={this.handleChangeInputGroup}
                />

                <Button onClick={this.handleIncludeGroup}>Add User to Group</Button>
                <CancelButton href={'/Groups/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default GroupAdd