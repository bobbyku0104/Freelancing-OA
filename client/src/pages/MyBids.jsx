import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyBids();
  }, []);

  const fetchMyBids = async () => {
    try {
      const data = await api.bids.getMyBids();
      setBids(data.bids);
    } catch (err) {
      setError('Failed to fetch your bids');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
           <div>
              <h1 className="text-3xl font-bold text-gray-900">My Proposals</h1>
              <p className="text-gray-600 mt-1">Track the status of your submitted proposals</p>
           </div>
           <Link to="/gigs" className="mt-4 md:mt-0 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-2.5 px-6 rounded-lg transition shadow-sm">
              Find More Work
           </Link>
        </div>

        {error && (
           <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg mb-6">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
           </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-sm text-gray-500 uppercase tracking-wide font-bold mb-1">Active Bids</div>
              <div className="text-3xl font-bold text-indigo-600">{bids.filter(b => b.status === 'pending').length}</div>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-sm text-gray-500 uppercase tracking-wide font-bold mb-1">Won Jobs</div>
              <div className="text-3xl font-bold text-green-600">{bids.filter(b => b.status === 'hired').length}</div>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 disaled opacity-60">
              <div className="text-sm text-gray-500 uppercase tracking-wide font-bold mb-1">Total Earnings</div>
              <div className="text-3xl font-bold text-gray-900">$0.00</div>
           </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
           {loading ? (
              <div className="p-12 text-center">
                 <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto"></div>
                 <p className="text-gray-500 mt-4">Loading your proposals...</p>
              </div>
           ) : bids.length > 0 ? (
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                       <tr>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Project</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Bid Amount</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {bids.map((bid) => (
                          <tr key={bid._id} className="hover:bg-gray-50 transition-colors">
                             <td className="px-6 py-4">
                                <Link to={`/gigs/${bid.gigId._id}`} className="font-bold text-gray-900 hover:text-indigo-600 transition block mb-1">
                                   {bid.gigId.title}
                                </Link>
                                <p className="text-sm text-gray-500 truncate max-w-xs">{bid.gigId.description}</p>
                             </td>
                             <td className="px-6 py-4 text-sm text-gray-500">
                                {new Date(bid.createdAt).toLocaleDateString()}
                             </td>
                             <td className="px-6 py-4 font-bold text-gray-900">
                                ${bid.bidAmount}
                             </td>
                             <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                   bid.status === 'hired' ? 'bg-green-100 text-green-700' : 
                                   bid.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                   'bg-yellow-100 text-yellow-700'
                                }`}>
                                   {bid.status}
                                </span>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <Link to={`/gigs/${bid.gigId._id}`} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition">
                                   View Details
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
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 mb-2">No attempts yet</h3>
                 <p className="text-gray-500 mb-6">Start browsing jobs to send your first proposal.</p>
                 <Link to="/gigs" className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md">
                    Browse Jobs
                 </Link>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default MyBids;
