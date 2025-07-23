import { Link, Navigate, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate("/login");
    };

  return (
    <nav className='bg-gray-900 p-4 text-white shadow-lg'>
        <div className='container mx-auto flex items-center justify-between'>
            <Link to="/">Notes App</Link>
            {user && (
                <>
                    <div className='flex items-center space-x-4'>
                        <span className='text-gray-300 font-medium'>{user.username}</span>
                        <button 
                            className='bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700'
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </>
            )}
        </div>
    </nav>
  )
}

export default Navbar