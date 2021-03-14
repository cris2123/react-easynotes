import { useState, useEffect } from 'react';
import apiNotes from '../api/notes';

const useNotes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, [] );

    const getNotes = async () => {
        const response = await apiNotes.get('/notes');
        setNotes(response.data)
    };

    return [notes, getNotes];
}

export default useNotes;