import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteModal from './NoteModal';
import { useLocation } from 'react-router-dom';
import { MdModeEditOutline, MdDelete } from "react-icons/md";

const Home = () => {
const [notes, setNotes] = useState([]);
const [error, setError] = useState('');
const [isModalOpen, setIsModalOpen] = useState(false);
const [editNote, setEditNote] = useState(null);
const location = useLocation();

const fetchNotes = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No authentication token found. Please log in");
            return;
        }
      const searchParams = new URLSearchParams(location.search);
      const search = searchParams.get("search") || "";
      const { data } = await axios.get("/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredNotes = search
        ? data.filter(
            (note) =>
              note.title.toLowerCase().includes(search.toLowerCase()) ||
              note.description.toLowerCase().includes(search.toLowerCase())
          )
        : data;
        setNotes(filteredNotes);
    } catch(err) {
        console.error(err);
        setError("Failed to fetch notes");
    }
    }

    const handleEdit = (note) => {
        setEditNote(note);
        setIsModalOpen(true);
    }

    useEffect(() => {
        fetchNotes();
    }, [location.search]);

    const handleSaveNote = (newNote) => {
        if (editNote) {
            setNotes(notes.map((note) => note._id === newNote._id ? newNote : note));
        } else {
            setNotes([...notes, newNote]);
        }
        setEditNote(null);
        setIsModalOpen(false);
    }

    const handleDelete  = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No authentication token found. Please log in");
                return;
            }
            await axios.delete(`/api/notes/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setNotes(notes.filter((note) => note._id !== id));
        } catch(err) {
            console.error(err);
            setError("Failed to delete note");
        }
    };



  return (
    <div className='container mx-auto px-4 py-8 mt-6 min-h-screen bg-white'>
        {error && <p className='text-red-400 mb-4'>{error}</p>}
        <NoteModal isOpen={isModalOpen} onClose={() => {
            setIsModalOpen(false);
            setEditNote(null);
        }}
            note={editNote}
            onSave={handleSaveNote}
        />
        <button 
            className='fixed bottom-6 right-6 w-14 h-14 bg-blue-700 rounded-full text-white text-3xl text-center shadow-lg hover:bg-blue-800 duration-100 flex items-center justify-center'
            onClick={() => setIsModalOpen(true)}
        >
            <span className='flex items-center justify-center h-full w-full'>+</span>
        </button>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {notes.map((note) => (
                <div className='bg-white p-4 rounded-lg shadow-lg' key={note._id}>
                    <h3 className='text-lg font-medium text-black mb-2'>{note.title}</h3>
                    <p className='text-gray-500 mb-4'>{note.description}</p>
                    <p className='text-sm text-gray-400 mb-4'>{new Date(note.updatedAt).toLocaleString()}</p>
                    <div className='flex items-center space-x-2'>
                        <button 
                            onClick={() => handleEdit(note)}
                            className='bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700'
                        >
                            <MdModeEditOutline />
                        </button>
                        <button 
                            onClick={() => handleDelete(note._id)}
                            className='bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700'
                        >
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home
