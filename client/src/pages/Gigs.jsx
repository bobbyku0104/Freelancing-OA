import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    budgetMin: '',
    budgetMax: '',
    type: 'all' 
  });

  useEffect(() => {
    fetchGigs();
  }, [search]); // Re-fetch when search changes

  const fetchGigs = async () => {
    try {
      // In a real app, we'd pass filters to the API too
      const data = await api.gigs.getAll(search);
      setGigs(data.gigs);
    } catch (err) {
      setError('Failed to fetch gigs');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGigs();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Browse Jobs</h1>
            <p className="text-gray-500 mt-1">Found {gigs.length} results</p>
          </div>
          
          <div className="mt-4 md:mt-0 w-full md:w-auto flex gap-3">
             <Link to="/post-gig" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg transition shadow-md flex items-center gap-2">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
               Post a Job
             </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="w-full lg:w-1/4">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <form onSubmit={handleSearch}>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search for services..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
                      />
                      <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                  </div>

                  <div className="mb-6">
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</label>
                     <div className="flex items-center gap-2">
                        <input type="number" placeholder="Min" className="w-1/2 p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                        <span className="text-gray-400">-</span>
                        <input type="number" placeholder="Max" className="w-1/2 p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                     </div>
                  </div>

                  <div className="mb-6">
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                     <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-indigo-600">
                           <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                           Development & IT
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-indigo-600">
                           <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                           Design & Creative
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-indigo-600">
                           <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                           Sales & Marketing
                        </label>
                     </div>
                  </div>

                  <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition">
                     Apply Filters
                  </button>
                </form>
             </div>
          </div>

          {/* Main Content - Gig Grid */}
          <div className="w-full lg:w-3/4">
            {loading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[1, 2, 3, 4].map((n) => (
                   <div key={n} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse h-64">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                      <div className="h-20 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between mt-auto">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                      </div>
                   </div>
                 ))}
               </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-8 rounded-xl text-center">
                <svg className="w-12 h-12 mx-auto text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            ) : gigs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gigs.map((gig) => (
                  <Link
                    key={gig._id}
                    to={`/gigs/${gig._id}`}
                    className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm">
                            {gig.ownerId?.name?.charAt(0).toUpperCase() || 'U'}
                         </div>
                         <div>
                            <p className="text-sm font-medium text-gray-900">{gig.ownerId?.name}</p>
                            <p className="text-xs text-gray-500">Posted {new Date(gig.createdAt).toLocaleDateString()}</p>
                         </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        gig.status === 'open' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {gig.status === 'open' ? 'Open' : 'Assigned'}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {gig.title}
                    </h2>
                    
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                      {gig.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                       <div className="flex flex-col">
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Budget</span>
                          <span className="font-bold text-gray-900">${gig.budget}</span>
                       </div>
                       <span className="text-sm text-indigo-600 font-medium group-hover:underline">
                         View Details &rarr;
                       </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No gigs found</h3>
                <p className="text-gray-500">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gigs;
