import React, {useState, useEffect} from 'react'
import NoteList from '../components/NoteList';
import NoteDetail from '../components/NoteDetail';
import ModalForm from '../components/Form';
import Modal from '../components/Modal';
import useGetNotes from '../hooks/getNotes';
import apiNotes from '../api/notes';
import "../styles/styles.css";


const App = () => {
    const [noteSelected, setSelectedNote] = useState(null)
    const [modalActive, setModalActive] = useState(false);
    const [notes, getNotes] = useGetNotes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( ()=> {
        const currentNote = noteSelected ? noteSelected: notes[0];
        setSelectedNote(currentNote)
    }, [notes, noteSelected]);


    const onNoteSelected = (note) => {
        setSelectedNote(note)
    }

    const renderNotes = () => {
        getNotes()
    }

    const openModal = () => {
        setModalActive(true);
    }

    const renderModalContent = () => {
        return (
            <ModalForm 
                onSubmit={createNote}
                formId="createNote"
            />
        )
    }

    const renderModalActions = (formId) => {
        return(
            <>
                <button
                    form={formId}
                    className="ui button positive">
                        Save
                </button>
                <button
                    onClick={() => setModalActive(!modalActive)}
                    className="ui cancel button red">Close
                </button>
            </>
        )
        

    }

    const createNote = async (event) => {
        event.preventDefault()
        const date = new Date();
        const note = {
            title: event.target.elements[0].value,
            content: event.target.elements[1].value,
            created: `${date.toDateString()} ${date.toLocaleTimeString()}`,
            modified: `${date.toDateString()} ${date.toLocaleTimeString()}`
        };
        const response = await apiNotes.post('notes/', note)
        if (response.status === 201) {
            // getNotes()
            renderNotes();
            setModalActive(false);
        }
    }

    

    return (
        <div className="two column stackable ui grid">
            <div className="column">
                {/* here some padding will be good */}
                <asid className="ui container list-notes">
                    <NoteList notes={notes} onNoteSelected={onNoteSelected} />
                </asid>
            </div>
            <div className="column">
                {noteSelected &&
                    <div className="ui segment">
                    <NoteDetail note={noteSelected} onNoteSelected={onNoteSelected} renderNotes={renderNotes} />
                    </div>
                }
            </div>
            {modalActive &&
                <Modal
                    title="Create a Note"
                    content={renderModalContent()}
                    actions={renderModalActions("createNote")}
                    onSubmit={createNote}
                    onDismiss={setModalActive}
                />
            }
            
            <button onClick={openModal} className="ui green button">Create Note</button>
        </div>
    )
}


export default App;