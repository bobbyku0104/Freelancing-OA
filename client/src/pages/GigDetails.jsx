import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const GigDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [myBid, setMyBid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form state for new bid
  const [bidForm, setBidForm] = useState({
    message: '',
    bidAmount: '',
  });
  const [bidLoading, setBidLoading] = useState(false);
  const [bidError, setBidError] = useState('');

  useEffect(() => {
    fetchGigDetails();
  }, [id]);

  const fetchGigDetails = async () => {
    try {
      setLoading(true);
      const data = await api.gigs.getById(id);
      setGig(data.gig);

      // If owner, fetch all bids
      if (user && data.gig.ownerId._id === user.id) {
        try {
          const bidsData = await api.bids.getByGigId(id);
          setBids(bidsData.bids);
        } catch (err) {
          console.error('Failed to fetch bids:', err);
        }
      }

      // If freelancer, fetch my bids to see if I already applied
      if (user && user.role === 'freelancer') {
         try {
            const myBidsData = await api.bids.getMyBids();
            const existingBid = myBidsData.bids.find(b => b.gigId._id === id);
            setMyBid(existingBid);
         } catch (err) {
            console.error('Failed to check existing bid:', err);
         }
      }
    } catch (err) {
      setError(err.message || 'Failed to load gig details');
    } finally {
      setLoading(false);
    }
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setBidLoading(true);
    setBidError('');

    try {
      await api.bids.submit({
        gigId: id,
        ...bidForm
      });
      // Refresh details to show "You have applied" state
      fetchGigDetails();
      setBidForm({ message: '', bidAmount: '' });
    } catch (err) {
      setBidError(err.message || 'Failed to submit bid');
    } finally {
      setBidLoading(false);
    }
  };

  const handleHire = async (bidId) => {
    if (!confirm('Are you sure you want to hire this freelancer? This action cannot be undone.')) {
      return;
    }

    try {
      await api.bids.hire(bidId);
      alert('Freelancer hired successfully!');
      fetchGigDetails(); // Refresh to show updated status
    } catch (err) {
      alert(err.message || 'Failed to hire freelancer');
    }
  };

  if (loading) return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
     </div>
  );

  if (error || !gig) return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100 text-center">
           <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           <h3 className="text-lg font-bold text-gray-900 mb-2">Error Loading Gig</h3>
           <p className="text-gray-600">{error || 'Gig not found'}</p>
           <Link to="/gigs" className="mt-4 inline-block text-indigo-600 font-medium hover:underline">Return to Gigs</Link>
        </div>
     </div>
  );

  const isOwner = user && gig.ownerId._id === user.id;
  const isFreelancer = user && user.role === 'freelancer';
  const isOpen = gig.status === 'open';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm font-medium text-gray-500">
           <Link to="/gigs" className="hover:text-indigo-600 transition">Browse Gigs</Link>
           <span className="mx-2">/</span>
           <span className="text-gray-900 truncate max-w-xs">{gig.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* Job Details Card */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex justify-between items-start mb-6">
                   <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                      {gig.title}
                   </h1>
                   <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase ${
                      isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                   }`}>
                      {gig.status}
                   </span>
                </div>

                <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-500 border-b border-gray-100 pb-8">
                   <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Posted {new Date(gig.createdAt).toLocaleDateString()}
                   </div>
                   <div className="flex items-center gap-2">
                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                       Remote
                   </div>
                   <div className="flex items-center gap-2">
                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                       General Project
                   </div>
                </div>

                <div className="prose max-w-none text-gray-700 leading-relaxed">
                   <h3 className="text-lg font-bold text-gray-900 mb-4">Job Description</h3>
                   <p className="whitespace-pre-line">{gig.description}</p>
                </div>
             </div>

             {/* Proposals Section (Only for Owner) */}
             {isOwner && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                   <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                      <h2 className="text-xl font-bold text-gray-900">Proposals ({bids.length})</h2>
                      <div className="text-sm text-gray-500">
                         Review and manage bids
                      </div>
                   </div>
                   
                   {bids.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                         {bids.map((bid) => (
                            <div key={bid._id} className={`p-8 hover:bg-gray-50 transition-colors ${bid.status === 'hired' ? 'bg-green-50/50' : ''}`}>
                               <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                                        {bid.freelancerId.name.charAt(0).toUpperCase()}
                                     </div>
                                     <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{bid.freelancerId.name}</h4>
                                        <div className="text-sm text-gray-500">{bid.freelancerId.email}</div>
                                     </div>
                                  </div>
                                  <div className="text-right">
                                     <div className="text-2xl font-bold text-gray-900">${bid.bidAmount}</div>
                                     <div className={`text-xs font-bold uppercase tracking-wider mt-1 ${
                                        bid.status === 'hired' ? 'text-green-600' : 
                                        bid.status === 'rejected' ? 'text-red-500' : 'text-yellow-600'
                                     }`}>
                                        {bid.status}
                                     </div>
                                  </div>
                               </div>
                               
                               <div className="bg-gray-50 p-4 rounded-lg text-gray-700 italic border border-gray-100 mb-6">
                                  "{bid.message}"
                               </div>

                               {bid.status === 'pending' && isOpen && (
                                  <div className="flex justify-end gap-3">
                                     <button className="px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200 transition">
                                        Message
                                     </button>
                                     <button 
                                        onClick={() => handleHire(bid._id)}
                                        className="px-6 py-2 rounded-lg text-sm font-bold text-white bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
                                     >
                                        Hire Freelancer
                                     </button>
                                  </div>
                               )}
                            </div>
                         ))}
                      </div>
                   ) : (
                      <div className="p-12 text-center text-gray-500">
                         No proposals yet. Waiting for freelancers to apply.
                      </div>
                   )}
                </div>
             )}

             {/* Application Form (Only for Freelancer & Open & Not applied yet) */}
             {isFreelancer && isOpen && !myBid && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 border-t-4 border-t-indigo-500 p-8">
                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit a Proposal</h2>
                   {bidError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                         {bidError}
                      </div>
                   )}
                   <form onSubmit={handleBidSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                         <div className="md:col-span-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Bid Amount ($)</label>
                            <div className="relative">
                               <span className="absolute left-3 top-3 text-gray-500">$</span>
                               <input 
                                  type="number" 
                                  required
                                  min="1"
                                  value={bidForm.bidAmount}
                                  onChange={(e) => setBidForm({...bidForm, bidAmount: e.target.value})}
                                  className="w-full pl-7 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                  placeholder="0.00"
                               />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Client's Budget: ${gig.budget}</p>
                         </div>
                         <div className="md:col-span-2">
                             <label className="block text-sm font-bold text-gray-700 mb-2">Cover Letter</label>
                             <textarea 
                                required
                                rows="4"
                                value={bidForm.message}
                                onChange={(e) => setBidForm({...bidForm, message: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="Explain why you are the best fit for this job..."
                             ></textarea>
                         </div>
                      </div>
                      <div className="flex justify-end">
                         <button 
                            type="submit" 
                            disabled={bidLoading}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-50"
                         >
                            {bidLoading ? 'Submitting...' : 'Send Proposal'}
                         </button>
                      </div>
                   </form>
                </div>
             )}

             {/* Application Status (If Applied) */}
             {isFreelancer && myBid && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                   <h2 className="text-xl font-bold text-gray-900 mb-4">Your Proposal Status</h2>
                   <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <div>
                         <div className="text-2xl font-bold text-gray-900 mb-1">${myBid.bidAmount}</div>
                         <div className="text-gray-500 text-sm">Bid Amount</div>
                      </div>
                      <div className={`px-6 py-2 rounded-full font-bold uppercase tracking-wide text-sm ${
                         myBid.status === 'hired' ? 'bg-green-100 text-green-700' :
                         myBid.status === 'rejected' ? 'bg-red-100 text-red-700' :
                         'bg-yellow-100 text-yellow-700'
                      }`}>
                         {myBid.status}
                      </div>
                   </div>
                   {myBid.status === 'hired' && (
                      <div className="mt-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-center gap-3">
                         <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                         Congratulations! You have been hired for this project. The client will be in touch shortly.
                      </div>
                   )}
                </div>
             )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-8">
             {/* Client Info */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">About the Client</h3>
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                      {gig.ownerId.name.charAt(0).toUpperCase()}
                   </div>
                   <div>
                      <div className="font-bold text-gray-900">{gig.ownerId.name}</div>
                      <div className="text-sm text-gray-500">Member since {new Date(gig.ownerId.createdAt).getFullYear()}</div>
                   </div>
                </div>
                <div className="space-y-3">
                   <div className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Payment Verified
                   </div>
                   <div className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                      5.0/5 Rating
                   </div>
                   <div className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8M3 21h18M3 21l-3-3m3 3l3-3m15 3l-3-3m3 3l3-3M3 3h18a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" /></svg>
                      10+ Jobs Posted
                   </div>
                </div>
             </div>

             {/* Budget Card */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Project Budget</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">${gig.budget}</div>
                <div className="text-sm text-gray-600 mb-6">Fixed price project</div>
                {!isOwner && isOpen && !myBid && (
                   <button 
                      onClick={() => document.querySelector('form').scrollIntoView({ behavior: 'smooth' })}
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
                   >
                      Apply Now
                   </button>
                )}
                {!isOpen && (
                   <div className="w-full bg-gray-100 text-gray-500 py-3 rounded-lg font-bold text-center">
                      Job Closed
                   </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GigDetails;
