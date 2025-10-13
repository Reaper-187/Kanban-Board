import { useEffect, useState, type ChangeEvent } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { toast } from "sonner";

type FileDataProps = {
  value: File[] | null;
  onChange: (newFile: File[] | null) => void;
};

export const Dropzone = ({ value, onChange }: FileDataProps) => {
  const ACCEPTED_FILE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    //MIME-Typ (Multipurpose Internet Mail Extensions)
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/xml",
  ];

  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    const allAccepted = selectedFiles.every((file) =>
      ACCEPTED_FILE_TYPES.includes(file.type)
    );

    if (!allAccepted) {
      toast(
        "Only .pdf, .xls, .doc, .xml, .jpg, .jpeg, .png and .webp formats are supported."
      );
      return;
    }

    setFiles((prev) => [...prev, ...selectedFiles]);
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
