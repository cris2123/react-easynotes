import React from 'react';
import Note from '../components/Note';



const NoteList = ({notes, onNoteSelected}) => {
    
    const renderedNotes = notes.map( (note) => {
        return (
            <Note 
                key={note.id}
                onNoteSelect={onNoteSelected}
                note={note}
            />
        )
    })
    return ( 
        <div className="ui relaxed divided list">
            {renderedNotes}
        </div>
    )
}

export default NoteList;