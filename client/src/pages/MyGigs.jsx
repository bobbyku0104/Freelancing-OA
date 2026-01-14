import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyGigs();
  }, []);

  const fetchMyGigs = async () => {
    try {
      const data = await api.gigs.getMyGigs();
      setGigs(data.gigs);
    } catch (err) {
      setError('Failed to fetch your gigs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
           <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Jobs</h1>
              <p className="text-gray-600 mt-1">Track and manage your posted job listings</p>
           </div>
           <Link to="/post-gig" className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-md flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Post New Job
           </Link>
        </div>

        {error && (
           <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg mb-6">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
           </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
           {loading ? (
              <div className="p-12 text-center">
                 <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto"></div>
                 <p className="text-gray-500 mt-4">Loading your jobs...</p>
              </div>
           ) : gigs.length > 0 ? (
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                       <tr>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Job Details</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Budget</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date Posted</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {gigs.map((gig) => (
                          <tr key={gig._id} className="hover:bg-gray-50 transition-colors">
                             <td className="px-6 py-4">
                                <Link to={`/gigs/${gig._id}`} className="font-bold text-gray-900 hover:text-indigo-600 transition block mb-1">
                                   {gig.title}
                                </Link>
                                <p className="text-sm text-gray-500 truncate max-w-md">{gig.description}</p>
                             </td>
                             <td className="px-6 py-4 font-medium text-gray-900">
                                ${gig.budget}
                             </td>
                             <td className="px-6 py-4 text-sm text-gray-500">
                                {new Date(gig.createdAt).toLocaleDateString()}
                             </td>
                             <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                   gig.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                   {gig.status}
                                </span>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <Link to={`/gigs/${gig._id}`} className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 transition">
                                   View Proposals
                                   <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           ) : (
              <div className="p-16 text-center">
                 <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 mb-2">No jobs posted yet</h3>
                 <p className="text-gray-500 mb-6">Create your first job post to start hiring talent.</p>
                 <Link to="/post-gig" className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md">
                    Post a Job
                 </Link>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default MyGigs;
