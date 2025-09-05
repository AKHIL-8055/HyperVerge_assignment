import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Ai from "./Ai";

export default function SignIn() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [capturedImage, setCapturedImage] = useState(null);

  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const selectedLanguage = localStorage.getItem('selectedLanguage') || "English";

  const stepNames = {
    1: selectedLanguage === "Hindi" ? "चरण 1: OTP सत्यापन" : 
        selectedLanguage === "Tamil" ? "படி 1: OTP சரிபார்ப்பு" :
        selectedLanguage === "Telugu" ? "దశ 1: OTP ధృవీకరణ" :
        selectedLanguage === "Urdu" ? "مرحلہ 1: OTP تصدیق" :
        "Step 1: OTP Verification",
    2: selectedLanguage === "Hindi" ? "चरण 2: चेहरा सत्यापन" : 
        selectedLanguage === "Tamil" ? "படி 2: முக சரிபார்ப்பு" :
        selectedLanguage === "Telugu" ? "దశ 2: ముఖ ధృవీకరణ" :
        selectedLanguage === "Urdu" ? "مرحلہ 2: چہرہ تصدیق" :
        "Step 2: Face Verification",
  };

  const translations = {
    English: {
      phonePlaceholder: "Enter phone number",
      sendOtp: "Send OTP",
      otpPlaceholder: "Enter OTP",
      verifyOtp: "Verify OTP",
      takeSelfie: "Take Selfie",
      verifyFace: "Verify Face",
      retake: "Retake",
      otpSent: "OTP sent! (mock OTP: 8055)",
      otpSuccess: "Mobile number verified ✅",
      otpInvalid: "Invalid OTP! Try 8055",
      faceMissing: "Please take a selfie first!",
      faceSuccess: "Face verified ✅",
    },
    Hindi: {
      phonePlaceholder: "फोन नंबर दर्ज करें",
      sendOtp: "OTP भेजें",
      otpPlaceholder: "OTP दर्ज करें",
      verifyOtp: "OTP सत्यापित करें",
      takeSelfie: "सेल्फी लें",
      verifyFace: "चेहरा सत्यापित करें",
      retake: "दोबारा लें",
      otpSent: "OTP भेजा गया! (मॉक OTP: 8055)",
      otpSuccess: "मोबाइल नंबर सत्यापित ✅",
      otpInvalid: "अमान्य OTP! 8055 आज़माएं",
      faceMissing: "कृपया पहले सेल्फी लें!",
      faceSuccess: "चेहरा सत्यापित ✅",
    },
    Tamil: {
      phonePlaceholder: "தொலைபேசி எண்ணை உள்ளிடவும்",
      sendOtp: "OTP அனுப்பவும்",
      otpPlaceholder: "OTP உள்ளிடவும்",
      verifyOtp: "OTP சரிபார்க்கவும்",
      takeSelfie: "செல்ஃபி எடுக்கவும்",
      verifyFace: "முகத்தை சரிபார்க்கவும்",
      retake: "மீண்டும் எடுக்கவும்",
      otpSent: "OTP அனுப்பப்பட்டது! (மாக் OTP: 8055)",
      otpSuccess: "மொபைல் எண் சரிபார்க்கப்பட்டது ✅",
      otpInvalid: "தவறான OTP! 8055 முயற்சிக்கவும்",
      faceMissing: "தயவுசெய்து முதலில் செல்ஃபி எடுக்கவும்!",
      faceSuccess: "முகம் சரிபார்க்கப்பட்டது ✅",
    },
    Telugu: {
      phonePlaceholder: "ఫోన్ నంబర్‌ను నమోదు చేయండి",
      sendOtp: "OTP పంపండి",
      otpPlaceholder: "OTP నమోదు చేయండి",
      verifyOtp: "OTP ధృవీకరించండి",
      takeSelfie: "సెల్ఫీ తీసుకోండి",
      verifyFace: "ముఖం ధృవీకరించండి",
      retake: "మళ్లీ తీసుకోండి",
      otpSent: "OTP పంపబడింది! (మాక్ OTP: 8055)",
      otpSuccess: "మొబైల్ నంబర్ ధృవీకరించబడింది ✅",
      otpInvalid: "చెల్లని OTP! 8055 ప్రయత్నించండి",
      faceMissing: "దయచేసి ముందు సెల్ఫీ తీసుకోండి!",
      faceSuccess: "ముఖం ధృవీకరించబడింది ✅",
    },
    Urdu: {
      phonePlaceholder: "فون نمبر درج کریں",
      sendOtp: "OTP بھیجیں",
      otpPlaceholder: "OTP درج کریں",
      verifyOtp: "OTP کی تصدیق کریں",
      takeSelfie: "سیلفی لیں",
      verifyFace: "چہرہ کی تصدیق کریں",
      retake: "دوبارہ لیں",
      otpSent: "OTP بھیجا گیا! (موک OTP: 8055)",
      otpSuccess: "موبائل نمبر کی تصدیق ہوگئی ✅",
      otpInvalid: "غلط OTP! 8055 آزمائیں",
      faceMissing: "براہ کرم پہلے سیلفی لیں!",
      faceSuccess: "چہرہ کی تصدیق ہوگئی ✅",
    },
  };

  const t = translations[selectedLanguage] || translations.English;

  // Step 1: Send OTP (mock)
  const sendOtp = () => {
    console.log("Sending OTP 8055 to", phone);
    console.log(t.otpSent);
  };

  const verifyOtp = () => {
    if (otp === "8055") {
      console.log(t.otpSuccess);
      setStep(2);
    } else {
      console.log(t.otpInvalid);
    }
  };

  // Step 2: Capture selfie using webcam
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const verifyFace = () => {
    if (!capturedImage) {
      console.log(t.faceMissing);
      return;
    }
    console.log(t.faceSuccess);
    navigate("/dashboard");
  };

  return (
    <div className="signin min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">{stepNames[step]}</h2>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-4">
          {[1, 2].map((s) => (
            <div key={s} className={`w-1/2 h-1 ${s <= step ? 'bg-blue-500' : 'bg-gray-300'}`} />
          ))}
        </div>

        {/* Step 1: OTP */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder={t.phonePlaceholder}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-500 text-white px-4 py-3 rounded font-semibold hover:bg-blue-600 transition"
              onClick={sendOtp}
            >
              {t.sendOtp}
            </button>

            <input
              type="text"
              placeholder={t.otpPlaceholder}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-green-500 text-white px-4 py-3 rounded font-semibold hover:bg-green-600 transition"
              onClick={verifyOtp}
            >
              {t.verifyOtp}
            </button>
          </div>
        )}

        {/* Step 2: Face Verification */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            {!capturedImage ? (
              <div className="flex flex-col items-center gap-4">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "user" }}
                  className="border border-gray-300 rounded w-full"
                />
                <button
                  className="bg-blue-500 text-white px-4 py-3 rounded font-semibold hover:bg-blue-600 transition w-full"
                  onClick={capturePhoto}
                >
                  {t.takeSelfie}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center">
                <img
                  src={capturedImage}
                  alt="Selfie Preview"
                  className="rounded border border-gray-300 w-full max-h-64 object-cover"
                />
                <button
                  className="bg-green-500 text-white px-4 py-3 rounded font-semibold hover:bg-green-600 transition w-full"
                  onClick={verifyFace}
                >
                  {t.verifyFace}
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-3 rounded font-semibold hover:bg-gray-600 transition w-full"
                  onClick={() => setCapturedImage(null)}
                >
                  {t.retake}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Ai/>
    </div>
  );
}