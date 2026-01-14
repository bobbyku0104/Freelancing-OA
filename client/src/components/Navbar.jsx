import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center transform group-hover:scale-110 transition">
                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-2xl font-bold hover:text-indigo-200 transition">
                FreelanceHub
              </span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/gigs" className="hover:text-indigo-200 transition font-medium px-3 py-2 rounded-lg hover:bg-white/10">
                Browse Gigs
              </Link>
              {isAuthenticated && (
                <>
                  <Link to="/post-gig" className="hover:text-indigo-200 transition font-medium px-3 py-2 rounded-lg hover:bg-white/10">
                    Post Gig
                  </Link>
                  <Link to="/my-gigs" className="hover:text-indigo-200 transition font-medium px-3 py-2 rounded-lg hover:bg-white/10">
                    My Gigs
                  </Link>
                  <Link to="/my-bids" className="hover:text-indigo-200 transition font-medium px-3 py-2 rounded-lg hover:bg-white/10">
                    My Bids
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-lg">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold">{user?.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      user?.role === 'client' 
                        ? 'bg-purple-500' 
                        : 'bg-indigo-500'
                    }`}>
                      {user?.role === 'client' ? 'Client' : 'Freelancer'}
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-white text-indigo-600 rounded-full flex items-center justify-center font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-bold hover:bg-indigo-50 transition shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-indigo-200 transition font-medium px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-bold hover:bg-indigo-50 transition shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
