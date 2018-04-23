import React, { Component } from 'react';
import glamorous from 'glamorous';
import { TransitionMotion, spring } from 'react-motion';

let Wrapper = glamorous.div(
    {
        width: 600,
        height: 800,
        margin: 'auto',
        background: 'orange',
        position: 'relative',
        overflow: 'hidden'
    }
)

let Inner = glamorous.div(
    {
        width: 600,
        height: 800,
        background: 'lightblue',
        position: 'relative',
    }
)

export default class MountAnim extends Component {


    render() {
        return (
            <Wrapper>
                <TransitionMotion
                    defaultStyles={[{
                        key: 'orange-div',
                        style: { top: 300 }
                    }]}
                    styles={[{
                        key: 'orange-div',
                        style: { top: spring(0) }
                    }]}>
                    {
                        interpolatedStyles =>
                            <div>
                                {
                                    interpolatedStyles.map((config) => {
                                        return <Inner key={config.key} style={{ ...config.style }}>
                                                    {config.style.top}
                                                </Inner>
                                    })
                                }
                            </div>


                    }

                </TransitionMotion>
            </Wrapper>
        )
    }
}