import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 flex content-center items-center justify-center min-h-[85vh]">
        <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80')"
          }}>
          <span id="blackOverlay" className="w-full h-full absolute opacity-60 bg-black"></span>
        </div>
        <div className="container relative mx-auto px-4">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
              <div className="">
                <h1 className="text-white font-bold text-5xl md:text-6xl tracking-tight leading-tight mb-8">
                  Find the perfect <span className="text-indigo-400">freelance services</span> for your business
                </h1>
                <p className="mt-4 text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-light">
                   Work with talented people at the most affordable price to get the most out of your time and cost.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  {!isAuthenticated && (
                    <>
                      <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-lg">
                        Get Started
                      </Link>
                      <Link to="/login" className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 text-lg">
                        Sign In
                      </Link>
                    </>
                  )}
                  {isAuthenticated && (
                    <Link to="/gigs" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-lg shadow-indigo-500/30">
                      Browse Gigs
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-10 border-b border-gray-100 shadow-sm relative z-10 -mt-10 mx-4 md:mx-20 rounded-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">50M+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Freelancers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">100k+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Gigs Posted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">0%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Platform Fee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">24/7</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-gray-50 py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 font-semibold mb-8 text-sm uppercase tracking-widest">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             <h3 className="text-2xl font-bold text-gray-800 font-serif italic">Google</h3>
             <h3 className="text-2xl font-bold text-gray-800 font-serif">Meta</h3>
             <h3 className="text-2xl font-bold text-gray-800 font-mono tracking-tighter">NETFLIX</h3>
             <h3 className="text-2xl font-bold text-gray-800 font-serif">P&G</h3>
             <h3 className="text-2xl font-bold text-gray-800 font-sans italic text-indigo-800">PayPal</h3>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">A whole world of freelance talent</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Connecting you with the best talent to get your projects done.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Quality Work</h3>
              <p className="text-gray-600 leading-relaxed">
                Find the right freelancer to begin working on your project within minutes is easy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Protected Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Always know what you'll pay upfront. Your payment isn't released until you approve the work.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Questions? Our round-the-clock support team is available to help anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

       {/* Value Proposition */}
       <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-5/12 ml-auto px-4 mb-12 md:mb-0">
              <div className="md:pr-12">
                <div className="text-indigo-500 font-bold tracking-wider uppercase mb-2">Why Choose Us?</div>
                <h3 className="text-4xl font-bold mb-8 leading-tight">The best part? Everything.</h3>
                <ul className="list-none space-y-8">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-indigo-500 flex items-center justify-center mr-4 mt-1">
                      <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Stick to your budget</h4>
                      <p className="text-gray-400 leading-relaxed">Find the right service for every price point. No hourly rates, just project-based pricing.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-indigo-500 flex items-center justify-center mr-4 mt-1">
                      <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Get quality work done quickly</h4>
                      <p className="text-gray-400 leading-relaxed">Hand your project over to a talented freelancer in minutes, get long-lasting results.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-indigo-500 flex items-center justify-center mr-4 mt-1">
                      <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Pay when you're happy</h4>
                      <p className="text-gray-400 leading-relaxed">Upfront quotes mean no surprises. Payments only get released when you approve.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-6/12 mr-auto px-4 relative">
               <div className="absolute -top-10 -right-10 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
               <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
               <img alt="..." className="relative rounded-2xl shadow-2xl border-4 border-gray-800" src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-4/12 px-4 mb-8">
              <h4 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>FreelanceHub</span>
              </h4>
              <p className="text-lg text-gray-600 mb-6">
                Connecting talented freelancers with businesses worldwide.
              </p>
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                 </div>
              </div>
            </div>
            <div className="w-full lg:w-8/12 px-4">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                     <h5 className="uppercase text-gray-900 font-bold mb-4 text-sm tracking-wider">Categories</h5>
                     <ul className="list-none text-sm space-y-3 text-gray-600">
                        <li className="hover:text-indigo-600 cursor-pointer transition">Graphics & Design</li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Digital Marketing</li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Writing & Translation</li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Video & Animation</li>
                     </ul>
                  </div>
                  <div>
                     <h5 className="uppercase text-gray-900 font-bold mb-4 text-sm tracking-wider">About</h5>
                     <ul className="list-none text-sm space-y-3 text-gray-600">
                        <li className="hover:text-indigo-600 cursor-pointer transition">Careers</li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Press & News</li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Partnerships</li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Privacy Policy</li>
                     </ul>
                  </div>
                  <div>
                     <h5 className="uppercase text-gray-900 font-bold mb-4 text-sm tracking-wider">Support</h5>
                     <ul className="list-none text-sm space-y-3 text-gray-600">
                        <li className="hover:text-indigo-600 cursor-pointer transition">Help & Support</li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Trust & Safety</li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Selling on FreelanceHub</li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Buying on FreelanceHub</li>
                     </ul>
                  </div>
                  <div>
                     <h5 className="uppercase text-gray-900 font-bold mb-4 text-sm tracking-wider">Community</h5>
                     <ul className="list-none text-sm space-y-3 text-gray-600">
                        <li className="hover:text-indigo-600 cursor-pointer transition">Events</li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Blog</li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Forum</li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Community Standards</li>
                     </ul>
                  </div>
               </div>
            </div>
          </div>
          <hr className="my-8 border-gray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-500 font-medium py-1">
                Copyright © {new Date().getFullYear()} FreelanceHub. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
