import React, { useState, useRef, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import "./Upload.css";

interface UploadProps {
  onSelectedImageChange: (image: string) => void; // 이미지 하나만 전달하도록 수정
  clearSelectedImage: boolean;
}

const Upload: React.FC<UploadProps> = ({
  onSelectedImageChange,
  clearSelectedImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 이미지 하나만 저장
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (clearSelectedImage) {
      setSelectedImage(null);
      onSelectedImageChange("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [clearSelectedImage, onSelectedImageChange]);

  const onSelectFile = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const image = URL.createObjectURL(selectedFile);
      setSelectedImage(image);
      onSelectedImageChange(image); // 이미지 하나만 전달
    }

    e.target.value = "";
  };

  const removeFile = () => {
    setSelectedImage(null);
    onSelectedImageChange(""); // 이미지 제거 시 빈 문자열 전달
  };

  return (
    <div>
      <div className="flex w-full border border-solid rounded font-sm">
        {selectedImage && (
          <div className="flex items-center justify-between p-1 font-normal bg-gray-100 border border-gray-300 border-solid rounded-md w-[350px]">
            <div className="w-full h-auto">
              <img
                src={selectedImage}
                alt={`Preview`}
                className="w-[250px] h-[250px]"
              />
            </div>
            <button onClick={removeFile}>
              <IoCloseCircleOutline size="30" />
            </button>
          </div>
        )}
        {!selectedImage && (
          <input
            ref={fileInputRef}
            type="file"
            name="images"
            onChange={onSelectFile}
            accept=".png, .jpg, image/*"
          />
        )}
      </div>
    </div>
  );
};

export default Upload;
