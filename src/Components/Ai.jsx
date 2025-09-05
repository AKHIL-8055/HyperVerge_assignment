// import { useState } from 'react';
// import React from 'react';


// const Ai = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [error, setError] = useState('');

//   // Gemini API credentials
//   const geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=';
//   const geminiApiKey = 'AIzaSyAG2OiPFAm-oBb_CKqIAnYXazbAOjA40SE';

//   // Initialize SpeechRecognition
//   const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//   recognition.lang = 'en-US';
//   recognition.interimResults = false;
//   recognition.maxAlternatives = 1;

//   // Handle speech recognition results
//   recognition.onresult = (event) => {
//     const speechResult = event.results[0][0].transcript;
//     sendToGeminiAPI(speechResult);
//   };

//   recognition.onerror = (event) => {
//     setError(`Speech recognition error: ${event.error}`);
//     setIsListening(false);
//   };

//   recognition.onend = () => {
//     setIsListening(false);
//   };

//   // Start/stop speech recognition
//   const toggleListening = () => {
//     if (isListening) {
//       recognition.stop();
//     } else {
//       setError('');
//       recognition.start();
//       setIsListening(true);
//     }
//   };

//   // Send transcribed text to Gemini API
//   const sendToGeminiAPI = async (text) => {
//     try {
//       const response = await fetch(`${geminiApiUrl}${geminiApiKey}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: text }] }],
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch response from Gemini API');
//       }

//       const data = await response.json();
//       const generatedText = data.candidates[0].content.parts[0].text;
//       speak(generatedText);
//     } catch (err) {
//       setError(`API error: ${err.message}`);
//     }
//   };

//   // Convert text to speech
//   const speak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = 'en-US';
//     window.speechSynthesis.speak(utterance);
//   };

//   return (
//     <div className="flex flex-col items-center p-4">
//       <button
//         onClick={toggleListening}
//         className={`p-4 rounded-full ${
//           isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
//         } transition-colors duration-200`}
//         title={isListening ? 'Stop Listening' : 'Start Listening'}
//       >
//         {/* <RobotIcon className="h-8 w-8 text-white" /> */}
//         <h1 className="h-8 w-8 text-white">AI</h1>
//       </button>
//       {error && (
//         <p className="mt-2 text-red-500 text-sm">{error}</p>
//       )}
//     </div>
//   );
// };

// export default Ai;


import { useState } from 'react';
import React from 'react';

const Ai = () => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', message: '' });

  // Gemini API credentials
  const geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=';
  const geminiApiKey = 'AIzaSyAG2OiPFAm-oBb_CKqIAnYXazbAOjA40SE';

  // Initialize SpeechRecognition
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  // Handle speech recognition results
  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    sendToGeminiAPI(speechResult);
  };

  recognition.onerror = (event) => {
    setError(`Speech recognition error: ${event.error}`);
    setIsListening(false);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  // Start/stop speech recognition
  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      setError('');
      recognition.start();
      setIsListening(true);
    }
  };

  // Send transcribed text to Gemini API
  const sendToGeminiAPI = async (text) => {
    try {
      const response = await fetch(`${geminiApiUrl}${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: text }] }],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from Gemini API');
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      speak(generatedText);
    } catch (err) {
      setError(`API error: ${err.message}`);
    }
  };

  // Convert text to speech
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  // Handle modal toggle
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setFormData({ name: '', mobile: '', message: '' }); // Reset form
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      setError('Please fill in name and mobile number.');
      return;
    }
    // Mock LLM call for confirmation message
    const confirmationMessage = `Thank you, ${formData.name}. Your request for a customer care call has been submitted. We'll contact you at ${formData.mobile}.`;
    speak(confirmationMessage); // Use existing speak function
    toggleModal(); // Close modal
    setError('');
    // Replace with actual backend/LLM API call if needed
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex space-x-4">
        {/* AI Voice Assistant Button */}
        <button
          onClick={toggleListening}
          className={`p-4 rounded-full ${
            isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          } transition-colors duration-200`}
          title={isListening ? 'Stop Listening' : 'Start Listening'}
        >
          <h1 className="h-8 w-8 text-white">AI</h1>
        </button>
        {/* Customer Care Icon Button */}
        <button
          onClick={toggleModal}
          className="p-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200"
          title="Contact Customer Care"
        >
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 18h.01M8 21h8a2 2 0 002-2v-1.5a5.5 5.5 0 00-11 0V19a2 2 0 002 2zM12 11a3 3 0 100-6 3 3 0 000 6z"
            />
          </svg>
        </button>
      </div>
      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}

      {/* Modal for Customer Care Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-purple-100 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full transform transition-all">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Book a Customer Care Call</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="mobile">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your mobile number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="message">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any additional details"
                  rows="4"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ai;