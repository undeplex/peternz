// import { useState } from 'react';
// import PopupNotification from './PopupNotification';
// import { EnvelopeOpenIcon,EnvelopeIcon } from '@heroicons/react/24/outline';
// import { FaEnvelope } from 'react-icons/fa';

// export default function SubscribeForm() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch('/api/subscribe', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (res.ok) {
//         setMessage('Thank you for subscribing on our newsletter!');
//         setEmail('');
//         setShowPopup(true); // Show popup on success
//         setTimeout(() => setShowPopup(false), 5000); // Auto close after 5 seconds
//       } else {
//         setMessage(data.error || 'Something went wrong.');
//        // Auto close after 5 seconds

//       }
//     } catch (error) {
//       setLoading(false);
//       setMessage('An error occurred. Please try again.');
//     }
//   };

//   return (
    
//     <div className=" relative border-2 border-blue-500  mx-auto mb-6 mt-12 p-4  w-full max-w-md pt-[84px]">
//       <h1 className="text-3xl dark:bg-slate-900  w-[300px] play absolute bg-white left-[50%] translate-x-[-50%] top-[-40px] font-bold mb-4 text-center dark:text-gray-100">
//       <EnvelopeIcon className="size-7   inline mx-2 rotate-12"/>
//         Subscribe to our Newsletter
//       </h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4 relative bg">
//         <label className="absolute top-0 bg-white dark:bg-slate-900 left-2 px-2">Email</label>
//         <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border placeholder:dark:text-gray-300  w-full p-4 mt-3 bg-transparent"            placeholder="Peter@gmail.com"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-4 rounded-g hover:bg-blue-600 transition flex items-center justify-center"
//           disabled={loading}
//         >
//           {loading ? (
//             <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-5 h-5"></span>
//           ) : (
//             'Subscribe'
//           )}
//         </button>
//         <div className="text-sm my-2 dark:text-gray-100">
//           Inscrit toi a notre NewLetter pour recevoir 
//            <span className="underline"> directement dans ta boite mail de Blogs </span>
//             basés sur des <span className="underline"> Projets</span> réels avant la date de publication
//         </div>
//       </form>
   
//       {message && <p className="mt-4 p-9 text-center text-green-500">{message}</p>}
//       {showPopup && (
//         <PopupNotification message="Thank you for subscribing!" onClose={() => setShowPopup(false)} />
//       )}
//     </div>
//   );
// }
import { useState } from 'react';
import PopupNotification from './PopupNotification';
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage('Thank you for subscribing to our newsletter!');
        setEmail('');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setLoading(false);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="relative mx-auto  max-w-md p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-extrabold text-center mb-6 flex items-center justify-center gap-2 dark:text-gray-100">
        <EnvelopeOpenIcon className="w-8 h-8 text-blue-500 animate-bounce" />
        Subscribe to our Newsletter
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-5 h-5"></span>
          ) : (
            <>
              <EnvelopeOpenIcon className="w-5 h-5" />
              Subscribe
            </>
          )}
        </button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-300">
          Inscris-toi à notre newsletter pour recevoir <span className="underline">des blogs exclusifs</span> sur <span className="underline">des projets réels</span> avant leur publication.
        </p>
      </form>

      {message && (
        <p className="mt-6 p-4 text-center text-green-500 bg-green-100 dark:bg-green-900 rounded-lg">
          {message}
        </p>
      )}

      {showPopup && (
        <PopupNotification message="Thank you for subscribing!" onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}
