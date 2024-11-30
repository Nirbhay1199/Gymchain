import React, { useState, useCallback } from 'react';
import { ImageUpload } from './ImageUpload';
import { CameraCapture } from './CameraCapture';
import { ValidationResult } from '../validation/ValidationResult';

export function UploadSection() {
  const [showValidation, setShowValidation] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleFile = useCallback((file: File) => {
    // Create a FormData object to send the file as form data
    const formData = new FormData();
    formData.append("file", file);

    // Make the POST request to the API
    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Check the prediction from the API response
        setIsValid(data.prediction === "Yoga Pose");
        setShowValidation(true);
      })
      .catch((error) => {
        console.error("Error uploading the image:", error);
        setShowValidation(true); // Show validation regardless of success or failure
        setIsValid(false); // Indicate failure if there's an error
      });
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Upload Image</h3>
          <ImageUpload onFileSelect={handleFile} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Take Photo</h3>
          <CameraCapture onCapture={handleFile} />
        </div>
      </div>
      
      {showValidation && (
        <ValidationResult 
          isValid={isValid} 
          onClose={() => setShowValidation(false)} 
        />
      )}
    </div>
  );
}
