import React from 'react';

// Mock LLM function to generate dynamic narration (replace with your LLM API)
const generateKycNarration = (userName, kycStatus) => {
  // Example LLM prompt: "Given user [name] and KYC [status], create a friendly narration."
  const narrations = {
    verified: `Welcome ${userName}, your KYC verification is complete and secure.`,
    pending: `Hi ${userName}, your KYC is still pending. Please complete the face verification soon.`,
    failed: `Hello ${userName}, your KYC verification failed. Try again with better lighting.`
  };
  return narrations[kycStatus] || `Welcome ${userName}, your KYC status is ${kycStatus}.`;
};

function Dashboard({ userName = 'Akhil', kycStatus = 'verified' }) {
  // Function to trigger voice assistant (replace with your actual voice assistant API)
  const triggerVoiceAssistant = () => {
    const narration = generateKycNarration(userName, kycStatus);
    // Mock voice assistant call; integrate with your voice assistant
    console.log('Voice Assistant:', narration);
    alert(narration); // Replace with actual voice API, e.g., speechSynthesis.speak
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full transform transition-all hover:scale-105">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome {userName}
        </h1>
        <p className={`text-lg ${kycStatus === 'verified' ? 'text-green-600' : kycStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
          Your KYC is {kycStatus}.
        </p>

      </div>
    </div>
  );
}

export default Dashboard;