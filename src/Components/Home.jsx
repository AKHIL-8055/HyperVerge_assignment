import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Ai from "./Ai";

export default function Home() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || "English");

  // Indian languages list
  const indianLanguages = [
    "English", "Hindi", "Tamil", "Telugu", "Urdu"
  ];

  // Translation object
  const translations = {
    English: {
      welcome: "Welcome",
      selectLanguage: "Select your preferred language",
      signUp: "Sign Up",
      signIn: "Sign In",
    },
    Hindi: {
      welcome: "स्वागत है",
      selectLanguage: "अपनी पसंदीदा भाषा चुनें",
      signUp: "साइन अप करें",
      signIn: "साइन इन करें",
    },
    Tamil: {
      welcome: "வரவேற்கிறோம்",
      selectLanguage: "உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்",
      signUp: "பதிவு செய்யவும்",
      signIn: "உள்நுழையவும்",
    },
    Telugu: {
      welcome: "స్వాగతం",
      selectLanguage: "మీ ప్రాధాన్య భాషను ఎంచుకోండి",
      signUp: "నమోదు చేసుకోండి",
      signIn: "ప్రవేశించండి",
    },
    Urdu: {
      welcome: "خوش آمدید",
      selectLanguage: "اپنی پسندیدہ زبان منتخب کریں",
      signUp: "سائن اپ",
      signIn: "سائن ان",
    }
  };

  // Handle language selection and store in localStorage
  const handleLanguageSelect = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
  };

  const t = translations[selectedLanguage] || translations.English;

  return (
    <div className="home min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">{t.welcome}</h2>

        {/* Language Selection */}
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-600">{t.selectLanguage}</p>
          <select
            value={selectedLanguage}
            onChange={handleLanguageSelect}
            className="border border-gray-300 p-3 rounded w-full max-w-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {indianLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Progress Indicator (single step for Home) */}
        <div className="flex justify-between mb-4">
          <div className="w-full h-1 bg-blue-500" />
        </div>

        <div className="flex flex-col gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-3 rounded font-semibold hover:bg-blue-600 transition w-full"
            onClick={() => navigate("/signup")}
          >
            {t.signUp}
          </button>
          <button
            className="bg-green-500 text-white px-4 py-3 rounded font-semibold hover:bg-green-600 transition w-full"
            onClick={() => navigate("/signin")}
          >
            {t.signIn}
          </button>
        </div>
      </div>
      <Ai />
    </div>
  );
}