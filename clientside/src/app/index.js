import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { PostsList, PostAdd, GroupCreate, LoginPage, GroupAdd} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
             <LoginPage />
            <Switch>
                <Route path="/posts/list" exact component={PostsList} />
                <Route path="/posts/add" exact component={PostAdd} />
                <Route path="/group/add" exact component={GroupAdd} />
                <Route path="/group/create" exact component={GroupCreate} />
            </Switch>
        </Router>
    )
}

export default App
