import axios from 'axios';
import { useState, useEffect } from 'react';

const NoteModal = ({ isOpen, onClose, note, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    
    useEffect(() => {
        setTitle(note ? note.title : "");
        setDescription(note ? note.description : "");
        setError("");
    }, [note]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No authentication token found. Please log in");
            return;
        }

        const payload = {title, description};
        const config = {headers: {Authorization: `Bearer ${token}`}};
        if(note) {
          const { data } = await axios.put(`/api/notes/${note._id}`, payload, config);
          onSave(data);
        } else {
          const { data } = await axios.post("/api/notes", payload, config);
          onSave(data);
        }
        setTitle('');
        setDescription('');
        setError('');
        onClose();
      } catch(err) {
        console.log("Note save error:", err);
        setError("Failed to save note")
        
      }
    };
  
  if(!isOpen) return null;
  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50'>
        <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            {note ? "Edit Note" : "Create Note"}
          </h2>
          {error && <p className='text-red-400 mb-4'>{error}</p>}
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                required
                className='w-full px-3 py-2 bg-gray-200 text-gray-800 border border-gray-100 rounded-md outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <textarea 
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Note Description'
                rows={4}
                required
                className='w-full px-3 py-2 bg-gray-200 text-gray-800 border border-gray-100 rounded-md outline-none focus:ring-2 focus:ring-blue-500 resize-none'
              />
            </div>
            <div className='flex space-x-2'>
              <button 
                type='submit'
                className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
              >
                {note ? "Update" : "Create"}
              </button>
              <button 
                type='button'
                className='bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700'
                onClick={() => onClose()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default NoteModal