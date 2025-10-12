import { useEffect, useState, type ChangeEvent } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";

type FileDataProps = {
  value: File[] | null;
  onChange: (newFile: File[] | null) => void;
};

export const Dropzone = ({ value, onChange }: FileDataProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files); // e.target.files ist ein Obj daher dann Array.from()
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    onChange([...files, ...selectedFiles]);
  };

  const handleRemoveFile = (name: string) => {
    const updatedFiles = files?.filter((f) => f.name !== name) || null;
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  useEffect(() => {
    if (value) setFiles(value);
  }, [value]);

  return (
    <div className="space-y-2">
      <Input
        type="file"
        className="cursor-pointer hover:bg-gray-100 transition"
        multiple
        onChange={handleFileChange}
      />
      {files &&
        files.map((file) => (
          <li
            key={file.name}
            className="flex items-center justify-between text-sm bg-gray-100 p-2 rounded-md"
          >
            <p className="truncate">{file.name}</p>
            <X
              size={16}
              className="cursor-pointer text-gray-500 hover:text-red-500 transition"
              onClick={() => handleRemoveFile(file.name)}
            />
          </li>
        ))}
    </div>
  );
};

// const handleFileUpload = async () => {
//   if (!file) return;
//   setUploadStatus("uploading");
//   const formData = new FormData();
//   formData.append("file", file);
//   try {
//     await axios.post("BACKEND_URL", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     setUploadStatus("success");
//   } catch (err) {
//     setUploadStatus("error");
//     console.log(err);
//   }
// };
