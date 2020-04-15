import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import styled from 'styled-components'
import 'react-table/react-table.css'

var CryptoJS = require("crypto-js");



const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class PostsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllPosts().then(posts => {
            this.setState({
                posts: posts.data.data,
                isLoading: false,
            })
        })
        console.log(this.state.posts)
        var arr = await this.getGroups();
        var bytes
        var response;
        console.log(arr)
        for(var i = 0; i < this.state.posts.length; i++){
            for(var j = 0; j < arr.length; j++){
               // console.log(this.state.posts[i].group + arr[j])
                if(this.state.posts[i].group === arr[j]){
                    // eslint-disable-next-line no-loop-func
                    await api.getGroup(arr[j]).then(res => {
                        console.log('DECRPYTING');
                        response = res;
                        

                    });
                    await this.decrypt(response,i);
                    //decrpty
                    //var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
                    //var originalText = bytes.toString(CryptoJS.enc.Utf8);
                    //this.state.posts[i].postContent = originalText;
            }
        }
    }
}
 
    decrypt = async(res,i ) => {
        console.log(res)
        console.log(i)
        console.log(res.data.data[0].key)
        console.log(this.state.posts[i].postContent)

                var bytes  = CryptoJS.AES.decrypt(this.state.posts[i].postContent, res.data.data[0].key);
                var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
                console.log(decryptedData)
                       
                        // console.log(originalText)
                this.state.posts[i].postContent = '';
                this.state.posts[i].postContent = decryptedData;
    }

    getGroups = async () => {
        var sizes = [];
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



   
    render() {
        const { posts, isLoading } = this.state
        //this.decrypt();
        

        const columns = [
            {
                Header: 'User',
                accessor: 'userName',
                width: 200,
                filterable: true,
            },
            {
                Header: 'Post',
                accessor: 'postContent',
                filterable: true,
            },
        ]

        let showTable = true
        if (!posts.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={posts}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default PostsList
