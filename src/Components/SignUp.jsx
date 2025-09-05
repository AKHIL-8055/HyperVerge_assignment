import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import image from "../assets/Screenshot 2025-09-05 014222.png";
import Ai from "./Ai";


export default function SignUp() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [capturedImage, setCapturedImage] = useState(null);
  const [kycMethod, setKycMethod] = useState("");
  const [document, setDocument] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [showDigiMock, setShowDigiMock] = useState(false);
  const [mockUsername, setMockUsername] = useState("");
  const [mockPassword, setMockPassword] = useState("");
  const [selectedMockDoc, setSelectedMockDoc] = useState(null);
  const [digiStep, setDigiStep] = useState(1);
  const [digiMethod, setDigiMethod] = useState("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [username, setUsername] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [selectedDocs, setSelectedDocs] = useState([]);

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
    3: selectedLanguage === "Hindi" ? "चरण 3: KYC सत्यापन" : 
        selectedLanguage === "Tamil" ? "படி 3: KYC சரிபார்ப்பு" :
        selectedLanguage === "Telugu" ? "దశ 3: KYC ధృవీకరణ" :
        selectedLanguage === "Urdu" ? "مرحلہ 3: KYC تصدیق" :
        "Step 3: KYC Verification",
  };

  const translations = {
    English: {
      phonePlaceholder: "Enter phone number",
      sendOtp: "Send OTP",
      otpPlaceholder: "Enter OTP",
      verifyOtp: "Verify OTP",
      faceOption: "Choose an option to verify your face",
      takeSelfie: "Take Selfie",
      uploadPhoto: "Or upload existing photo",
      verifyFace: "Verify Face",
      retake: "Retake / Re-upload",
      verifyLater: "Verify Later",
      selectKyc: "Select KYC Method",
      digiLocker: "DigiLocker (Mock)",
      uploadDoc: "Upload Document",
      submitKyc: "Submit KYC",
      digiUsername: "Username",
      digiPassword: "Password",
      digiLogin: "Login",
      selectDoc: "Select a document to verify KYC",
      cancel: "Cancel",
      otpSent: "OTP sent! (mock OTP: 8055)",
      otpSuccess: "Mobile number verified ",
      otpInvalid: "Invalid OTP! Try 8055",
      faceMissing: "Please take a selfie or upload a photo!",
      faceSuccess: "Face verified ",
      docMissing: "Please upload a document!",
      kycSuccess: "KYC verified  via",
      kycLater: "You can verify KYC later ",
      faceLater: "You can verify face later ",
      loginError: "Enter username & password (mock)!",
      digiSuccess: "Logged in to DigiLocker (Mock) ",
      docSuccess: "Document selected and KYC verified ",
    },
    Hindi: {
      phonePlaceholder: "फोन नंबर दर्ज करें",
      sendOtp: "OTP भेजें",
      otpPlaceholder: "OTP दर्ज करें",
      verifyOtp: "OTP सत्यापित करें",
      faceOption: "अपने चेहरे को सत्यापित करने के लिए एक विकल्प चुनें",
      takeSelfie: "सेल्फी लें",
      uploadPhoto: "या मौजूदा फोटो अपलोड करें",
      verifyFace: "चेहरा सत्यापित करें",
      retake: "दोबारा लें / दोबारा अपलोड करें",
      verifyLater: "बाद में सत्यापित करें",
      selectKyc: "KYC विधि चुनें",
      digiLocker: "डिजिलॉकर (मॉक)",
      uploadDoc: "दस्तावेज़ अपलोड करें",
      submitKyc: "KYC जमा करें",
      digiUsername: "उपयोगकर्ता नाम",
      digiPassword: "पासवर्ड",
      digiLogin: "लॉगिन",
      selectDoc: "KYC सत्यापित करने के लिए दस्तावेज़ चुनें",
      cancel: "रद्द करें",
      otpSent: "OTP भेजा गया! (मॉक OTP: 8055)",
      otpSuccess: "मोबाइल नंबर सत्यापित ",
      otpInvalid: "अमान्य OTP! 8055 आज़माएं",
      faceMissing: "कृपया सेल्फी लें या फोटो अपलोड करें!",
      faceSuccess: "चेहरा सत्यापित ",
      docMissing: "कृपया एक दस्तावेज़ अपलोड करें!",
      kycSuccess: "KYC सत्यापित के माध्यम से",
      kycLater: "आप बाद में KYC सत्यापित कर सकते हैं ",
      faceLater: "आप बाद में चेहरा सत्यापित कर सकते हैं ",
      loginError: "उपयोगकर्ता नाम और पासवर्ड दर्ज करें (मॉक)!",
      digiSuccess: "डिजिलॉकर में लॉग इन किया गया (मॉक) ",
      docSuccess: "दस्तावेज़ चयनित और KYC सत्यापित ",
    },
    Tamil: {
      phonePlaceholder: "தொலைபேசி எண்ணை உள்ளிடவும்",
      sendOtp: "OTP அனுப்பவும்",
      otpPlaceholder: "OTP உள்ளிடவும்",
      verifyOtp: "OTP சரிபார்க்கவும்",
      faceOption: "உங்கள் முகத்தை சரிபார்க்க ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்",
      takeSelfie: "செல்ஃபி எடுக்கவும்",
      uploadPhoto: "அல்லது இருக்கும் புகைப்படத்தை பதிவேற்றவும்",
      verifyFace: "முகத்தை சரிபார்க்கவும்",
      retake: "மீண்டும் எடுக்கவும் / மீண்டும் பதிவேற்றவும்",
      verifyLater: "பின்னர் சரிபார்க்கவும்",
      selectKyc: "KYC முறையைத் தேர்ந்தெடுக்கவும்",
      digiLocker: "டிஜிலாக்கர் (மாக்)",
      uploadDoc: "ஆவணத்தை பதிவேற்றவும்",
      submitKyc: "KYC சமர்ப்பிக்கவும்",
      digiUsername: "பயனர்பெயர்",
      digiPassword: "கடவுச்சொல்",
      digiLogin: "உள்நுழையவும்",
      selectDoc: "KYC சரிபார்க்க ஒரு ஆவணத்தைத் தேர்ந்தெடுக்கவும்",
      cancel: "ரத்து செய்யவும்",
      otpSent: "OTP அனுப்பப்பட்டது! (மாக் OTP: 8055)",
      otpSuccess: "மொபைல் எண் சரிபார்க்கப்பட்டது ",
      otpInvalid: "தவறான OTP! 8055 முயற்சிக்கவும்",
      faceMissing: "தயவுசெய்து செல்ஃபி எடுக்கவும் அல்லது புகைப்படத்தை பதிவேற்றவும்!",
      faceSuccess: "முகம் சரிபார்க்கப்பட்டது ",
      docMissing: "தயவுசெய்து ஒரு ஆவணத்தை பதிவேற்றவும்!",
      kycSuccess: "KYC சரிபார்க்கப்பட்டது  மூலம்",
      kycLater: "நீங்கள் பின்னர் KYC சரிபார்க்கலாம் ",
      faceLater: "நீங்கள் பின்னர் முகத்தை சரிபார்க்கலாம் ",
      loginError: "பயனர்பெயர் & கடவுச்சொல்லை உள்ளிடவும் (மாக்)!",
      digiSuccess: "டிஜிலாக்கரில் உள்நுழைந்துள்ளீர்கள் (மாக்) ",
      docSuccess: "ஆவணம் தேர்ந்தெடுக்கப்பட்டு KYC சரிபார்க்கப்பட்டது ",
    },
    Telugu: {
      phonePlaceholder: "ఫోన్ నంబర్‌ను నమోదు చేయండి",
      sendOtp: "OTP పంపండి",
      otpPlaceholder: "OTP నమోదు చేయండి",
      verifyOtp: "OTP ధృవీకరించండి",
      faceOption: "మీ ముఖాన్ని ధృవీకరించడానికి ఒక ఎంపికను ఎంచుకోండి",
      takeSelfie: "సెల్ఫీ తీసుకోండి",
      uploadPhoto: "లేదా ఇప్పటికే ఉన్న ఫోటోను అప్‌లోడ్ చేయండి",
      verifyFace: "ముఖం ధృవీకరించండి",
      retake: "మళ్లీ తీసుకోండి / మళ్లీ అప్‌లోడ్ చేయండి",
      verifyLater: "తర్వాత ధృవీకరించండి",
      selectKyc: "KYC పద్ధతిని ఎంచుకోండి",
      digiLocker: "డిజిలాకర్ (మాక్)",
      uploadDoc: "డాక్యుమెంట్ అప్‌లోడ్ చేయండి",
      submitKyc: "KYC సమర్పించండి",
      digiUsername: "యూజర్ నేమ్",
      digiPassword: "పాస్‌వర్డ్",
      digiLogin: "లాగిన్",
      selectDoc: "KYC ధృవీకరించడానికి ఒక డాక్యుమెంట్‌ను ఎంచుకోండి",
      cancel: "రద్దు చేయండి",
      otpSent: "OTP పంపబడింది! (మాక్ OTP: 8055)",
      otpSuccess: "మొబైల్ నంబర్ ధృవీకరించబడింది ",
      otpInvalid: "చెల్లని OTP! 8055 ప్రయత్నించండి",
      faceMissing: "దయచేసి సెల్ఫీ తీసుకోండి లేదా ఫోటో అప్‌లోడ్ చేయండి!",
      faceSuccess: "ముఖం ధృవీకరించబడింది ",
      docMissing: "దయచేసి ఒక డాక్యుమెంట్ అప్‌లోడ్ చేయండి!",
      kycSuccess: "KYC ధృవీకరించబడింది  ద్వారా",
      kycLater: "మీరు తర్వాత KYC ధృవీకరించవచ్చు ",
      faceLater: "మీరు తర్వాత ముఖం ధృవీకరించవచ్చు ",
      loginError: "యూజర్ నేమ్ & పాస్‌వర్డ్ నమోదు చేయండి (మాక్)!",
      digiSuccess: "డిజిలాకర్‌లో లాగిన్ అయ్యారు (మాక్) ",
      docSuccess: "డాక్యుమెంట్ ఎంపిక చేసి KYC ధృవీకరించబడింది ",
    },
    Urdu: {
      phonePlaceholder: "فون نمبر درج کریں",
      sendOtp: "OTP بھیجیں",
      otpPlaceholder: "OTP درج کریں",
      verifyOtp: "OTP کی تصدیق کریں",
      faceOption: "اپنے چہرے کی تصدیق کرنے کے لیے ایک آپشن منتخب کریں",
      takeSelfie: "سیلفی لیں",
      uploadPhoto: "یا موجودہ تصویر اپ لوڈ کریں",
      verifyFace: "چہرہ کی تصدیق کریں",
      retake: "دوبارہ لیں / دوبارہ اپ لوڈ کریں",
      verifyLater: "بعد میں تصدیق کریں",
      selectKyc: "KYC طریقہ منتخب کریں",
      digiLocker: "ڈیجی لاکر (ماخوذ)",
      uploadDoc: "دستاویز اپ لوڈ کریں",
      submitKyc: "KYC جمع کریں",
      digiUsername: "صارف نام",
      digiPassword: "پاس ورڈ",
      digiLogin: "لاگ ان",
      selectDoc: "KYC کی تصدیق کے لیے ایک دستاویز منتخب کریں",
      cancel: "منسوخ کریں",
      otpSent: "OTP بھیجا گیا! (ماخوذ OTP: 8055)",
      otpSuccess: "موبائل نمبر کی تصدیق ہوگئی ",
      otpInvalid: "غلط OTP! 8055 آزمائیں",
      faceMissing: "براہ کرم سیلفی لیں یا تصویر اپ لوڈ کریں!",
      faceSuccess: "چہرہ کی تصدیق ہوگئی ✅",
      docMissing: "براہ کرم ایک دستاویز اپ لوڈ کریں!",
      kycSuccess: "KYC کی تصدیق ہوگئی ✅ کے ذریعے",
      kycLater: "آپ بعد میں KYC کی تصدیق کر سکتے ہیں ✅",
      faceLater: "آپ بعد میں چہرہ کی تصدیق کر سکتے ہیں ✅",
      loginError: "صارف نام اور پاس ورڈ درج کریں (ماخوذ)!",
      digiSuccess: "ڈیجی لاکر میں لاگ ان ہوگئے (ماخوذ) ✅",
      docSuccess: "دستاویز منتخب اور KYC کی تصدیق ہوگئی ✅",
    }
  };

  const t = translations[selectedLanguage] || translations.English;

  // Step 1: OTP
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

  // Step 2: Face verification
  const startCamera = () => setCameraOn(true);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setCameraOn(false);
  };

  const handleFaceUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCapturedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const verifyFace = () => {
    if (!capturedImage) {
      console.log(t.faceMissing);
      return;
    }
    console.log(t.faceSuccess);
    setStep(3);
  };

  const verifyFaceLater = () => {
    console.log(t.faceLater);
    setStep(3);
  };

  // Step 3: KYC
  const selectKyc = (method) => {
    setKycMethod(method);
    if (method === "digiLocker") {
      setShowDigiMock(true);
    }
  };

  const handleFileUpload = (e) => setDocument(e.target.files[0]);

  const submitKyc = () => {
    if (kycMethod === "manual" && !document) {
      console.log(t.docMissing);
      return;
    }
    console.log(`${t.kycSuccess} ${kycMethod}`);
    navigate("/dashboard");
  };

  const verifyLater = () => {
    console.log(t.kycLater);
    navigate("/dashboard");
  };

  // DigiLocker Mock Flow
  const handleDigiLogin = () => {
    if (!mockUsername || !mockPassword) {
      console.log(t.loginError);
      return;
    }
    console.log(t.digiSuccess);
  };

  const selectMockDoc = (doc) => {
    setSelectedMockDoc(doc);
    setShowDigiMock(false);
    console.log(`${t.docSuccess}`);
    navigate("/dashboard");
  };

  const mockDocuments = [
    { name: "Aadhaar", id: "XX954147", src: "/mock_docs/aadhaar.png" },
    { name: "OBC Certificate", id: "XX3b4dac", src: "/mock_docs/obc.png" },
    { name: "PAN Verification Record", id: "XXR989bH", src: "/mock_docs/pan.png" },
  ];

  return (
    <div className="signup min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">{stepNames[step]}</h2>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-1/3 h-1 ${s <= step ? 'bg-blue-500' : 'bg-gray-300'}`} />
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
              <div className="flex flex-col gap-4">
                <p className="text-gray-600 text-center">{t.faceOption}</p>
                {!cameraOn && (
                  <button
                    className="bg-blue-500 text-white px-4 py-3 rounded font-semibold hover:bg-blue-600 transition"
                    onClick={startCamera}
                  >
                    {t.takeSelfie}
                  </button>
                )}
                {cameraOn && (
                  <div className="flex flex-col items-center gap-2">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{ facingMode: "user" }}
                      className="border border-gray-300 rounded w-full"
                    />
                    <button
                      className="bg-green-500 text-white px-4 py-3 rounded font-semibold hover:bg-green-600 transition w-full"
                      onClick={capturePhoto}
                    >
                      {t.takeSelfie}
                    </button>
                  </div>
                )}

                <label className="flex flex-col gap-1 text-gray-600">
                  {t.uploadPhoto}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFaceUpload}
                    className="border border-gray-300 p-3 rounded file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded file:font-semibold file:hover:bg-blue-600"
                  />
                </label>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center">
                <img
                  src={capturedImage}
                  alt="Face Preview"
                  className="rounded border border-gray-300 w-full max-h-64 object-cover"
                />
                <button
                  className="bg-green-500 text-white px-4 py-3 rounded font-semibold hover:bg-green-600 transition w-full"
                  onClick={verifyFace}
                >
                  uploadPhoto
                  {/* {t.verifyFace} */}
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-3 rounded font-semibold hover:bg-blue-600 transition w-full"
                  onClick={() => setCapturedImage(null)}
                >
                  {t.retake}
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-3 rounded font-semibold hover:bg-gray-600 transition w-full mt-4"
                  onClick={verifyFaceLater}
                >
                  {t.verifyLater}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: KYC */}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            <p className="text-gray-600 text-center">{t.selectKyc}</p>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-3 rounded font-semibold hover:bg-blue-600 transition flex-1"
                onClick={() => selectKyc("digiLocker")}
              >
                {t.digiLocker}
              </button>
              <button
                className="bg-green-500 text-white px-4 py-3 rounded font-semibold hover:bg-green-600 transition flex-1"
                onClick={() => selectKyc("manual")}
              >
                {t.uploadDoc}
              </button>
            </div>

            {kycMethod === "manual" && (
              <div className="flex flex-col gap-4 mt-4">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="border border-gray-300 p-3 rounded file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded file:font-semibold file:hover:bg-blue-600"
                />
                {document && (
                  <img
                    src={URL.createObjectURL(document)}
                    alt="Document Preview"
                    className="rounded border border-gray-300 w-full max-h-64 object-cover"
                  />
                )}
                <button
                  className="bg-green-600 text-white px-4 py-3 rounded font-semibold hover:bg-green-700 transition"
                  onClick={submitKyc}
                >
                  {t.submitKyc}
                </button>
              </div>
            )}

            <button
              className="bg-gray-500 text-white px-4 py-3 rounded font-semibold hover:bg-gray-600 transition mt-4"
              onClick={verifyLater}
            >
              {t.verifyLater}
            </button>
          </div>
        )}

        {/* DigiLocker Mock Modal */}
        {showDigiMock && (
          <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col gap-4">
              {/* <h3 className="text-xl font-bold text-center text-gray-800">DigiLocker</h3> */}
              <img src={image} alt="Logo" className="mx-auto mb-4 w-38 h-34" />

              {/* Step 1: Sign In with Mobile Number */}
              {digiStep === 1 && (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-around mb-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition"
                      onClick={() => setDigiMethod("mobile")}
                      style={{ flex: 1, marginRight: "4px" }}
                    >
                      Mobile
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-400 transition"
                      onClick={() => setDigiMethod("username")}
                      style={{ flex: 1, marginRight: "4px" }}
                    >
                      Username
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-400 transition"
                      onClick={() => setDigiMethod("aadhaar")}
                      style={{ flex: 1 }}
                    >
                      Aadhaar
                    </button>
                  </div>
                  {digiMethod === "mobile" && (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Mobile Number*"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-sm text-gray-500">Enter your registered Mobile Number</p>
                      <button
                        className="bg-green-500 text-white px-4 py-3 rounded font-semibold hover:bg-green-600 transition"
                        onClick={() => setDigiStep(2)}
                      >
                        Next
                      </button>
                      <p className="text-sm text-blue-500 text-center cursor-pointer" onClick={() => navigate("/signup")}>
                        Do not have an account? Sign Up
                      </p>
                    </div>
                  )}
                  {digiMethod === "username" && (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        className="bg-green-500 text-white px-4 py-3 rounded font-semibold hover:bg-green-600 transition"
                        onClick={() => setDigiStep(2)}
                      >
                        Next
                      </button>
                    </div>
                  )}
                  {digiMethod === "aadhaar" && (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Aadhaar Number"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value)}
                        className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        className="bg-green-500 text-white px-4 py-3 rounded font-semibold hover:bg-green-600 transition"
                        onClick={() => setDigiStep(2)}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Consent and Document Selection */}
              {digiStep === 2 && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-gray-600">
                    Please provide your consent to share the following with Samsung Wallet:
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <span>Issued Documents (5)</span>
                    <button
                      className="text-blue-500 text-sm"
                      onClick={() => setSelectedDocs(mockDocuments.map(doc => doc.name))}
                    >
                      Select all
                    </button>
                  </div>
                  {mockDocuments.map((doc, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedDocs.includes(doc.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDocs([...selectedDocs, doc.name]);
                          } else {
                            setSelectedDocs(selectedDocs.filter(d => d !== doc.name));
                          }
                        }}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="text-sm">{doc.name} ({doc.id})</span>
                    </label>
                  ))}
                  <a href="#" className="text-blue-500 text-sm mb-4">View all 5 documents</a>
                  <div className="border-t border-gray-300 pt-2">
                    <p className="text-sm text-gray-600">Profile Information</p>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                      <span className="text-sm">Name, Date of Birth, Gender</span>
                    </label>
                  </div>
                  <div className="border-t border-gray-300 pt-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                      <span className="text-sm">Get your Email</span>
                    </label>
                  </div>
                  <div className="border-t border-gray-300 pt-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                      <span className="text-sm">Get your address</span>
                    </label>
                  </div>
                  <div className="border-t border-gray-300 pt-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                      <span className="text-sm">Get your profile picture</span>
                    </label>
                  </div>
                  <div className="border-t border-gray-300 pt-2">
                    <p className="text-sm text-gray-600">Consent validity date (Today + 30 days)</p>
                    <p className="text-sm">04-October-2025 <a href="#" className="text-blue-500 text-sm">Edit</a></p>
                    <p className="text-xs text-gray-500">Consent validity is subject to applicable laws.</p>
                    <p className="text-xs text-gray-500">By clicking 'Allow', you are giving consent to share with Samsung Wallet.</p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded font-semibold hover:bg-gray-600 transition"
                      onClick={() => setShowDigiMock(false)}
                    >
                      Deny
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition"
                      onClick={() => {
                        console.log(`${t.digiSuccess}`);
                        navigate("/dashboard");
                      }}
                    >
                      Allow
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Ai/>
    </div>
  );
}