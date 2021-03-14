import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
    console.log(props)
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active fullscreen">
            <div className="ui standard modal visible active">
                
                <i onClick={() => props.onDismiss()} className="close icon"/>
                <div className="header">
                    {props.title}
                </div>

                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    )

};


export default Modal;