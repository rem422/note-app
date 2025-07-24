import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
const [notes, setNotes] = useState([]);
const [error, setError] = useState('');
console.log(notes);
    
const fetchNotes = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No authentication token found. Please log in");
            return;
        }
        const { data } = await axios.get("/api/notes", {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(data);
        setNotes(data);
    } catch(err) {
        console.error(err);
        setError("Failed to fetch notes");
    }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

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
    <div className='container mx-auto px-4 py-8 min-h-screen bg-gray-500'>
        {error && <p className='text-red-400 mb-4'>{error}</p>}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {notes.map((note) => (
                <div className='bg-gray-800 p-4 rounded-lg shadow-md' key={note._id}>
                    <h3 className='text-lg font-medium text-white mb-2'>{note.title}</h3>
                    <p className='text-gray-300 mb-4'>{note.description}</p>
                    <p className='text-sm text-gray-400 mb-4'>{new Date(note.updatedAt).toLocaleString()}</p>
                    <div className='flex items-center space-x-2'>
                        <button className='bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700'>Edit</button>
                        <button 
                            onClick={() => handleDelete(note._id)}
                            className='bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700'
                        >Delete</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home