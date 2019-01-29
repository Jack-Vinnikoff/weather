import React, {Component} from 'react'
import { Fade } from 'react-reveal'
import cn from 'classnames'
import PropTypes from "prop-types"

import './Modal.scss'

class Modal extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.isOpen && (
                    <React.Fragment>
                        <div className="back_drop"></div>
                        <Fade top>
                            <div className="wr_modal">
                                <div className="modal bg" style={{width: this.props.sizeModal}}>
                                    <div className="modal_header">
                                        <div className="modal_title">{this.props.title}</div>
                                    </div>
                                    <div className="modal_body">
                                        {this.props.children}
                                    </div>
                                </div>
                            </div>
                        </Fade> 
                    </React.Fragment>
                )}
            </React.Fragment>        )
    }
}
Modal.propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    modalClose: PropTypes.func,
    modalSize: PropTypes.string,
};
export default Modal;