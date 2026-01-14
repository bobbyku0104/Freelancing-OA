import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const PostGig = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.gigs.create(formData);
      navigate('/my-gigs');
    } catch (err) {
      setError(err.message || 'Failed to post gig');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
           <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
           <p className="mt-2 text-gray-600">Tell us what you need done and start receiving proposals.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
             {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg">
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

             <form onSubmit={handleSubmit} className="space-y-8">
               {/* Title Section */}
               <div>
                  <label htmlFor="title" className="block text-sm font-bold text-gray-900 mb-2">
                    Project Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    maxLength={100}
                    value={formData.title}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 transition sm:text-sm"
                    placeholder="e.g. Build a modern website for a law firm"
                  />
                  <p className="mt-2 text-xs text-gray-500">Provide a clear, concise title for your job post.</p>
               </div>

               {/* Description Section */}
               <div>
                  <label htmlFor="description" className="block text-sm font-bold text-gray-900 mb-2">
                    Job Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={8}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 transition sm:text-sm"
                    placeholder="Describe the deliverables, timeline, and any specific requirements..."
                  />
                  <p className="mt-2 text-xs text-gray-500">Be as detailed as possible to attract the right freelancers.</p>
               </div>

               {/* Budget Section */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="budget" className="block text-sm font-bold text-gray-900 mb-2">
                      Budget ($)
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        id="budget"
                        name="budget"
                        type="number"
                        min="5"
                        required
                        value={formData.budget}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-2 border-gray-200 pl-7 pr-12 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 transition sm:text-sm"
                        placeholder="0.00"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm">USD</span>
                      </div>
                    </div>
                 </div>
               </div>

               <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => navigate('/gigs')}
                    className="px-6 py-3 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Posting...' : 'Post Job Now'}
                  </button>
               </div>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostGig;
