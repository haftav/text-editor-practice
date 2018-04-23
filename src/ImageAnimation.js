import React, { Component, PureComponent } from 'react';
import { StaggeredMotion, spring } from 'react-motion';
import glamorous from 'glamorous';
import { css } from 'glamor';


const Wrapper = glamorous.div(
    {
        backgroundColor: 'steelblue',
        position: 'relative'
    },
    (props) => ({
        width: props.width,
        height: props.height
    })
)

const whiteBar = {
    width: '32px',
    height: '3px',
    background: 'white',
    left: '28px',
    right: '28px',
    position: 'absolute',
}

export default class Hamburger extends PureComponent {
    constructor() {
        super();

        this.state = {
            hovered: 0
        }

    }


    toggleHover = () => {
        let hoveredCopy = this.state.hovered
        if (this.state.hovered === 2) {
            this.setState({
                hovered: --hoveredCopy
            })
        }
        else {
            this.setState({
                hovered: ++hoveredCopy
            })
        }
    }
    render() {

        const {
            image
        } = this.props;


        const endingStyles = (prevStyles) => {
            switch (this.state.hovered) {
                case 1:
                    return [
                        { opacity: spring(0, {stiffness: 400, damping: 32}), top: spring(-7, { stiffness: 400, damping: 32 }) },
                        { opacity: spring(prevStyles[0].opacity, {stiffness: 400, damping: 32}), top: spring(prevStyles[0].top + 7, { stiffness: 400, damping: 32 }) },
                        { opacity: spring(prevStyles[1].opacity, {stiffness: 400, damping: 32}), top: spring(prevStyles[1].top + 7, { stiffness: 400, damping: 32 }) },
                        { opacity: spring(1 - prevStyles[2].opacity, {stiffness: 400, damping: 32}), top: spring(prevStyles[2].top + 7, { stiffness: 400, damping: 32 }) }
                    ]
                case 2:
                    return [
                        { opacity: spring(1 - prevStyles[1].opacity, {stiffness: 400, damping: 32}), top: spring(prevStyles[1].top - 7, { stiffness: 400, damping: 32 }) },
                        { opacity: spring(prevStyles[2].opacity, {stiffness: 400, damping: 32}), top: spring(prevStyles[2].top - 7, { stiffness: 400, damping: 32 }) },
                        { opacity: spring(prevStyles[3].opacity, {stiffness: 400, damping: 32}), top: spring(prevStyles[3].top - 7, { stiffness: 400, damping: 32 }) },
                        { opacity: spring(0, {stiffness: 400, damping: 32}), top: spring(21, { stiffness: 400, damping: 32 }) }
                    ]
                default: return [];
            }

        }


        return (
            <StaggeredMotion defaultStyles={[
                { opacity: 1, top: 0 },
                { opacity: 1, top: 7 },
                { opacity: 1, top: 14 },
                { opacity: 0, top: 21 }
            ]}
                styles={(prevStyles) => endingStyles(prevStyles)}>
                {
                    (styles) => (
                        <Wrapper width={93}
                            height={65}
                            onMouseEnter={this.toggleHover}
                            onMouseLeave={this.toggleHover}>
                            <div style={{
                                height: '18px',
                                position: 'absolute',
                                width: '100%',
                                top: '24px',
                                left: '0',
                            }}>
                                {
                                    styles.map((style, i) => (
                                        <div style={{
                                            ...whiteBar,
                                            top: style.top,
                                            opacity: i === 1 || i === 2 ? 1 : style.opacity
                                        }}>

                                        </div>
                                    ))

                                }
                            </div>

                        </Wrapper>
                    )
                }

            </StaggeredMotion>
        )
    }
}

