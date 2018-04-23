import React, { Component } from 'react';
import { TransitionMotion, StaggeredMotion, spring } from 'react-motion';
import glamorous from 'glamorous';


const Wrapper = glamorous.div(
    {
        backgroundColor: '#0083DD',
        position: 'relative',
        cursor: 'pointer'
    },
    (props) => ({
        width: props.width,
        height: props.height
    })
)

const whiteBar = {
    width: 37,
    height: 3,
    background: 'white',
    left: 28,
    right: 28,
    position: 'absolute',
}


const startingXStyles = [
    {
        top: -7,
        opacity: 0,
        rotate: 0
    },
    {
        top: 0,
        opacity: 1,
    },
    {
        top: 7,
        opacity: 1,
        rotate: 0
    },
    {
        top: 14,
        opacity: 1
    }
]


const endingXStyles = [
    {
        top: spring(7),
        opacity: spring(1),
        rotate: spring(-45)
    },
    {
        top: 0,
        opacity: spring(0)
    },
    {
        top: 7,
        opacity: 1,
        rotate: spring(45)
    },
    {
        top: 14,
        opacity: spring(0)
    }
]

const xWillLeaveStyles = [
    {
        top: spring(-7),
        opacity: spring(0),
        rotate: spring(0)
    },
    {
        top: spring(0),
        opacity: spring(1),
    },
    {
        top: spring(7),
        opacity: spring(1),
        rotate: spring(0)
    },
    {
        top: spring(14),
        opacity: spring(1)
    }
]


export default class MenuX extends Component {
    constructor() {
        super();

        this.state = {
            clicked: 0
        }
    }





    render() {
        const endingStyles = (prevStyles) => {
            switch (this.props.clicked) {
                case 1:
                    return endingXStyles;
                case 2:
                    return xWillLeaveStyles;
                default: return []
            }
        }
        return (
            <StaggeredMotion
                defaultStyles={startingXStyles.map((style) => style)}
                styles={(prevStyles) => endingStyles(prevStyles)} >
                {
                    styles =>
                        <div >
                            <Wrapper width={93}
                                height={65}
                                onClick={this.props.toggleMenu}>
                                <div style={{
                                    height: '18px',
                                    position: 'absolute',
                                    width: '100%',
                                    top: '24px',
                                    left: '0',
                                }}>
                                    {
                                        styles.map(config => {
                                            return <div
                                                style={{ ...config, ...whiteBar, transform: `rotate(${config.rotate}deg)` }}>
                                                {console.log(config)}
                                            </div>
                                        })
                                    }


                                </div>

                            </Wrapper>
                        </div>
                }
            </StaggeredMotion>
        )
    }


}

