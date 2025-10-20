import Layout from '@/components/Layout';
import Head from 'next/head';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Import Font Awesome icons
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaArrowRight,
  FaCheck,
  FaCircle,
  FaCloud
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Sending...');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Minimal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    { 
      Icon: FaEnvelope, 
      href: "mailto:your-email@example.com", 
      label: "Email"
    },
    { 
      Icon: FaGithub, 
      href: "https://github.com/your-profile", 
      label: "GitHub"
    },
    { 
      Icon: FaLinkedin, 
      href: "https://linkedin.com/in/your-profile", 
      label: "LinkedIn"
    },
    { 
      Icon: FaFacebook, 
      href: "https://facebook.com/your-profile", 
      label: "Facebook"
    },
    { 
      Icon: FaWhatsapp, 
      href: "https://wa.me/your-number", 
      label: "WhatsApp"
    },
    { 
      Icon: FaTwitter, 
      href: "https://twitter.com/your-profile", 
      label: "Twitter"
    }
  ];

  return (
    <Layout>
      <Head>
        <title>Contact Me | Peternz</title>
        <meta
          name="description"
          content="Get in touch with me at Peternz. Fill out the contact form or reach out via email, WhatsApp, Facebook, GitHub, LinkedIn, or Twitter."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://peternz.vercel.app/contact" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Header Section */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Let's discuss your project and how we can work together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
                Send a message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200"
                    placeholder="Email Address"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 resize-none"
                    placeholder="Your Message"
                    rows="4"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <FaArrowRight className="w-3 h-3" />
                    </>
                  )}
                </motion.button>

                {status && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-sm text-center flex items-center justify-center gap-2 ${
                      status.includes('successfully') 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}
                  >
                    {status.includes('successfully') && <FaCheck className="w-3 h-3" />}
                    {status}
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Social Links & Info */}
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              {/* Contact Info */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                  Direct contact
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Reach out through any of these platforms.
                </p>

                {/* Social Links Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="group flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                    >
                      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-600 group-hover:bg-gray-200 dark:group-hover:bg-gray-500 transition-colors duration-200">
                        <social.Icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <motion.div
                variants={itemVariants}
                className="bg-gray-900 flex gap-3 text-gray-400 items-center dark:bg-gray-700 rounded-xl p-3 text-white"
              >

              <FaCloud/>      <span>Response within 24 hours</span>
               
                  
                  
          
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Contact;