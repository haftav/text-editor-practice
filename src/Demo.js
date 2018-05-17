import React, { Component } from 'react';
import { Motion, StaggeredMotion, TransitionMotion, spring } from 'react-motion';
import glamorous from 'glamorous';

export default class Demo extends Component {
    constructor() {
        super();

        this.state = {
            move: false,
            render: false
        }
    }

    render() {
        return (
            <Wrapper>
                <button onClick={() => this.setState({ render: !this.state.render })}>Render the blue rectangle</button>
                <TransitionMotion
                    defaultStyles={
                        this.state.render ?
                        [{
                            key: 'test',
                            style: { height: 0, width: 0 }
                        }]
                        :
                        []
                    }
                    styles={
                        this.state.render ?
                        [{
                            key: 'test',
                            style: { height: spring(100), width: spring(100) }
                        }]
                        :
                        []
                }
                    willEnter={() => ({ height: 0, width: 0 })}
                    willLeave={() => ({ height: spring(0), width: spring(0)})}>
                    {
                        styles =>
                            <div style={{ height: '100%', width: '100%', border: '1px solid pink' }} >
                                {
                                    styles.map(({ key, style }) => {
                                        return <Thing key={key} style={{
                                            height: `${style.height}%`,
                                            width: `${style.width}%`
                                        }} />
                                    })
                                }
                            </div>
                    }

                </TransitionMotion>
                <Motion defaultStyle={{ left: 0 }} style={this.state.move ? { left: spring(200, {stiffness: 60, damping: 15}) } : { left: spring(0, {stiffness: 60, damping: 15}) }}>
                    {
                        style => <RedBox style={{ left: style.left }}>
                                    <p>{style.left}</p>
                                </RedBox>

                    }
                </Motion>
                <button style={{ position: 'absolute' }} onClick={() => this.setState({ move: !this.state.move })}> Move the red box </button>
            </Wrapper>
        )
    }
}

const Wrapper = glamorous.div({
    margin: 'auto',
    marginTop: 50,
    width: 400,
    height: 300,
    overflow: 'auto',
    border: '1px solid red'
})

const Thing = glamorous.div({
    width: 50,
    background: 'lightblue'
})

const RedBox = glamorous.div({
    width: 50,
    height: 50,
    background: 'red',
    position: 'absolute'
})