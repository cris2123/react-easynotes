import React from 'react';
import styles from '../styles/styles.css';


const Note = ({note, onNoteSelect}) => {
    return ( 
        <div onClick={ () => onNoteSelect(note)}  className="ui card note">
            <div className="content">
                <div className="header">
                    {note.title}
                </div>
                <div className="meta">
                    <span>{note.created}</span>
                </div>
                <p>{note.content}</p>
            </div>
        </div>
    )
}

export default Note;