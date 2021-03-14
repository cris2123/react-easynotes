import React from 'react';


const ModalForm = ({onSubmit, formId}) => {
    return (
        <div className="ui container">
            <form id={formId} onSubmit={onSubmit} className="ui form">
                <div className="field">
                    <label>Title</label>
                    <input 
                        type="text"
                        placeholder="title"
                    />
                </div>
                <div className="field">
                    <label>Content</label>
                    <textarea />
                </div>
            </form>
        </div>
    )
    
}

export default ModalForm;