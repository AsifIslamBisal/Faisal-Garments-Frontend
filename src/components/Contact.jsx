import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school_name: '', 
    message: ''
  });
  
  const [status, setStatus] = useState(''); 
  const [errors, setErrors] = useState({});

  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.school_name.trim()) newErrors.school_name = 'Institution name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus('sending');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '0fed4418-5fac-46aa-b2dd-5adda7e823be',
          ...formData,
          subject: 'New Contact Submission from Foysal Garments',
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', school_name: '', phone: '', message: '' }); 
        setTimeout(() => setStatus(''), 5000); 
      } else {
        setStatus('failed');
      }
    } catch (error) {
      setStatus('failed');
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 mt-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">
            Foysal Garments
          </h1>
          <p className="text-lg md:text-xl text-blue-600 font-semibold">
            বাংলাদেশের উন্নততম ও বৃহত্তম শিক্ষা প্রতিষ্ঠানের পোশাক তৈরির কারখানা
          </p>
          <div className="mt-6 w-32 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-8">Get in Touch</h2>
              <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                Partner with the leading uniform supplier in the country. We specialize in 
                high-quality, durable, and comfortable school uniforms tailored for excellence.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 flex items-center justify-center rounded-2xl text-blue-600 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Our Factory</h4>
                    <p className="text-slate-900 font-medium">Court Station Mor, Rajshahi Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-center space-x-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 flex items-center justify-center rounded-2xl text-blue-600 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Phone Support</h4>
                    <p className="text-slate-900 font-medium">+880 1676952977, +880 1820809695</p>
                  </div>
                </div>
                <div className="flex items-center space-x-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 flex items-center justify-center rounded-2xl text-blue-600 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Email Us</h4>
                    <p className="text-slate-900 font-medium">foysolgarments@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-slate-900 rounded-2xl text-white">
              <p className="text-sm opacity-80 leading-relaxed">
                "আমরা দেশের সেরা শিক্ষা প্রতিষ্ঠানগুলোর ইউনিফর্মের গুণগত মান নিশ্চিত করি।"
              </p>
            </div>
          </motion.div>


          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-slate-50"
          >
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 bg-slate-50 rounded-xl border-2 transition duration-300 outline-none placeholder-slate-400 ${errors.name ? 'border-red-300' : 'border-transparent focus:border-blue-500'}`} 
                      placeholder="Your Name"
                    />
                    {errors.name && <span className="text-red-500 text-[10px] ml-1 font-bold">{errors.name}</span>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 bg-slate-50 rounded-xl border-2 transition duration-300 outline-none placeholder-slate-400 ${errors.email ? 'border-red-300' : 'border-transparent focus:border-blue-500'}`} 
                      placeholder="Enter a Valid email"
                    />
                    {errors.email && <span className="text-red-500 text-[10px] ml-1 font-bold">{errors.email}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Institution Name</label>
                  <input 
                    type="text" 
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 bg-slate-50 rounded-xl border-2 transition duration-300 outline-none placeholder-slate-400 ${errors.school_name ? 'border-red-300' : 'border-transparent focus:border-blue-500'}`} 
                    placeholder="Enter school or college name"
                  />
                  {errors.school_name && <span className="text-red-500 text-[10px] ml-1 font-bold">{errors.school_name}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5" 
                    className="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-transparent focus:border-blue-500 transition duration-300 outline-none placeholder-slate-400 resize-none" 
                    placeholder="How can we help your institution?"
                  ></textarea>
                </div>

                <motion.button 
                  disabled={status === 'sending'}
                  whileHover={status !== 'sending' ? { y: -3, shadow: "0 10px 15px -3px rgba(37, 99, 235, 0.4)" } : {}}
                  whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                  type="submit" 
                  className={`w-full font-bold py-5 rounded-xl shadow-lg transition duration-300 flex items-center justify-center space-x-2 group ${status === 'sending' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  <span>{status === 'sending' ? 'Sending...' : 'Send Messages'}</span>
                  {status !== 'sending' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </motion.button>

                {status === 'success' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-green-600 font-bold bg-green-50 py-3 rounded-lg">
                    Message sent successfully!
                  </motion.p>
                )}
                {status === 'failed' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-red-600 font-bold bg-red-50 py-3 rounded-lg">
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;