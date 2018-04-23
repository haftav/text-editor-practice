import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value, Block, Range } from 'slate';
import SoftBreak from 'slate-soft-break'
import glamorous, { Div } from 'glamorous';
import { css } from 'glamor';

let titleStyling = css({
    fontSize: 25
})

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'title',
                min: 1,
                max: 1,
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: '',
                            },
                        ],
                    },
                ],
            },
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: '',
                            },
                        ],
                    },
                ],
            },
            {
                object: 'block',
                type: 'text',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: '',
                            },
                        ],
                    },
                ],
            }
        ],
    },
})

const schema = {
    document: {
        nodes: [
            { types: ['title'], min: 1, max: 1 },
            { types: ['paragraph'] },
            { types: ['text'] }
        ],
        normalize: (change, violation, { node, child, index }) => {
            console.log(violation);
            switch (violation) {
                case 'child_type_invalid': {
                    return change.setNodeByKey(
                        child.key,
                        index == 0 ? 'title' : 'paragraph'
                    )
                }
                case 'child_required': {
                    const block = Block.create(index == 0 ? 'title' : 'paragraph')
                    return change.insertNodeByKey(node.key, index, block)
                }
                default: return
            }
        },
    },
}

const plugins = [
    SoftBreak({
      onlyIn: ['paragraph']
    })
  ]


function TitleNode(props) {
    return (
        <h1 {...props.attributes} style={{ border: '1px solid red', fontFamily: "'Tinos', serif", fontSize: 35 }}>
            {props.children}
        </h1>
    )
}

function ParagraphNode(props) {
    return (
        <p {...props.attributes} style={{ border: '1px solid green', fontFamily: "'Tinos', serif", fontSize: 20 }}>
            {props.children}
        </p>
    )
}

export default class Slate extends Component {
    constructor() {
        super();

        this.state = {
            value: initialValue
        }
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }

    renderPlaceholder = (props) => {
        const { node, editor } = props
        // if (node.object != 'block') return
        // if (node.type != 'caption') return
        if (node.text != '') return
        if (node.type === 'title') {
            return (
                <span
                    contentEditable={false}
                    style={{ display: 'inline-block', width: '0', whiteSpace: 'nowrap', opacity: '0.33' }}
                >
                    Title
              </span>
            )
        } else if (node.type === 'paragraph') {
            return (
                <span
                    contentEditable={false}
                    style={{ display: 'inline-block', width: '0', whiteSpace: 'nowrap', opacity: '0.33' }}
                >
                    Tell your story...
              </span>
            )
        }

    }

    renderNode = props => {
        switch (props.node.type) {
            case 'title':
                return <TitleNode {...props} />
            case 'paragraph':
                return <ParagraphNode {...props} />

        }
    }

    onKeyDown = (event, change, editor) =>  {
        console.log(change);
        console.log(editor);
        // if (event.key == 'Enter') {
        //   change.insertBlock('paragraph')
        // }
      }

    render() {
        console.log(this.state.value)

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

                    <Editor
                        value={this.state.value}
                        onChange={this.onChange}
                        renderPlaceholder={this.renderPlaceholder}
                        renderNode={this.renderNode}
                        schema={schema}
                        // plugins={plugins}
                        onKeyDown={this.onKeyDown}
                    />
                </div>

            </Wrapper>
        )
    }
}

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
        marginLeft: 15
    }
)