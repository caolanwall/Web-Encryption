import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Web Encryption Application
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/posts/list" className="nav-link">
                                List posts
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/posts/add" className="nav-link">
                                Create a post
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/group/create" className="nav-link">
                                Create a group
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/group/add" className="nav-link">
                                Add a user to a group
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
