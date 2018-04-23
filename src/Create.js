import React, { Component } from 'react';
import glamorous, { Div } from 'glamorous';
import { css } from 'glamor'
import { Editor, EditorState, convertToRaw, ContentState, convertFromHTML, ContentBlock, genKey, Entity } from 'draft-js';
import './Create.css'

const Wrapper = glamorous.div(
    {
        border: '1px solid gray',
        width: 800,
        height: '100vh',
        margin: 'auto',
        marginTop: 65,
        overflow: 'auto',
        padding: 25
    }
)

const User = glamorous.div(
    {
        width: '90%',
        border: '1px solid red',
        height: 80,
        marginTop: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
)

const Photo = glamorous.div(
    {
        height: 50,
        width: 50,
        borderRadius: 100,
        background: 'lightblue'
    }
)

const UserInfo = glamorous.div(
    {
        ' h1': {
            fontSize: 15,
            color: 'black',
            margin: 0,
            fontWeight: 'normal'

        },
        ' p': {
            fontSize: 15,
            color: 'gray',
            margin: 0,
            marginTop: 3
        }
    },
    {
        border: '1px solid green',
        marginLeft: 15
    }
)


const Title = glamorous.input({
    display: 'block',
    border: '1px solid blue'
})

const Text = glamorous.textarea({
    display: 'block',
    border: 'none',
    outline: 'none',
    resize: 'none'
})


export default class Create extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            content: ''
        }
    }

    handleChange = (val, name) => {
        console.log(name, val)
        this.setState({
            [name]: val
        })
    }


    render() {
        return (
            <Wrapper>
                <p>Create your story below</p>
                <Div background='#e3e3e3' width='90%' height={1} />
                <User>
                    <Photo />
                    <UserInfo>
                        <h1>Tav Hafner</h1>
                        <p>Draft</p>
                    </UserInfo>
                </User>
                <div style={{ border: '1px solid blue' }}> 
                    <Title placeholder='Title'/>
                    <Text placeholder='Tell your story...'/>

                </div>

            </Wrapper>
        )
    }
}

