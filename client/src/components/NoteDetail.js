import React, {useState, useEffect} from 'react';
import apiNotes from '../api/notes'


const NoteDetail = ({note, onNoteSelected, renderNotes}) => {

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    useEffect(() => {
        setTitle(note.title);
        setContent(note.content);
    }, [note]);


    if (!note) {
        return <div>Loading</div>
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const noteId = event.nativeEvent.target.elements[0].value
        const date = new Date()
        
        await apiNotes.patch(`/notes/${noteId}`, {
            title: title,
            content: content,
            modified: `${date.toDateString()}  ${date.toLocaleTimeString()}`
        });
        renderNotes();
        onNoteSelected(note);

    };

    const handleDelete = async (event) => {
        event.preventDefault();
        const response = await apiNotes.delete(`/notes/${note.id}`);
        if (response.status !== 200) {
            alert("error deleting the note");
            return
        }
        onNoteSelected(null);
        renderNotes();

    }


    return (
        <div className="ui container">
            <form onSubmit={handleSubmit} className="ui form">
                <input type="hidden" value={note.id}/>
                <div className="field">
                    <label>Title</label>
                    <input 
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}}
                    />
                </div>
                <div className="field">
                    <label>Content</label>
                    <textarea 
                        onChange={(e)=> {setContent(e.target.value)}}
                        value={content} 
                    />
                </div>
                <button type="submit" className="ui submit green button">Save</button>
                <button onClick={handleDelete} className="ui red button">Delete</button>
            </form>
        </div>
    )
}

export default NoteDetail;