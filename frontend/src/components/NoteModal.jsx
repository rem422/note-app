import { useState } from 'react';

const NoteModal = ({ isOpen, onClose, note, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    
    useEffect(() => {
        setTitle(note ? note.title : "");
        setDescription(note ? note.description : "");
        setError("");
    }, [note])
  
  
  return (
    <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
        <h2 className='text-2xl font-semibold text-white mb-4'>Create Note</h2>
        {error && <p className='text-red-400 mb-4'>{error}</p>}
    </div>
  )
}

export default NoteModal