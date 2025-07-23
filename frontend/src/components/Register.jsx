import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate  = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post('/api/users/register', {
      username,
      email, 
      password
    });
    localStorage.setItem("token", data.token);
    setUser(data);
    navigate('/');
  } catch(err) {
    setError(err.response?.data?.message || "Server Error");
  }
}

  return (
    <div className='container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold mb-6 text-center'>Register</h2>
      {error && 
        <p className='text-red-500 mb-4 text-center'>
          {error}
        </p>
        }
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <input 
            type="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder='Username'
            required
            className='w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>
        <div>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Email'
            required
            className='w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>
        <div>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Password'
            required
            className='w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>
        <button 
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 duration-100'
        >
            Register
        </button>
      </form>
      <p className='mt-4 text-center'>Already have an account? <Link to="/login" className='text-blue-600 hover:underline'>Login</Link></p>
    </div>
  )
}

export default Register