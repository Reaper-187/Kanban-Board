import React, { useState, type ChangeEvent } from "react";
import { Button } from "../ui/button";
import axios from "axios";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export const Dropzone = () => {
  const [file, setFile] = useState<File | null>(null);

  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
    setUploadStatus("uploading");
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("BACKEND_URL", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("success");
    } catch (err) {
      setUploadStatus("error");
      console.log(err);
    }
  };

  return (
    <div>
      <input type="file" className="bg-red-200" onChange={handleFileChange} />
      {file && (
        <div className="mb-4 text-sm">
          <p>File name: {file.name}</p>
          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>File name: {file.type}</p>
        </div>
      )}
      {file && uploadStatus !== "uploading" && (
        <Button onClick={handleFileUpload}>Upload</Button>
      )}

      {uploadStatus === "success" && <p>File uploaded successfully!</p>}

      {uploadStatus === "error" && <p>upload fail. Please try again.</p>}
    </div>
  );
};
