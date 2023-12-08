import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import "./Upload.css";

const Upload = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // 초기 상태 명시
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // 초기 상태 명시

  const onSelectFile = (e: any) => {
    const selectedFiles = e.target.files;

    const fileArray = Array.from(selectedFiles) as File[]; // 타입 명시

    setSelectedFiles((prevFiles: File[]) => [...prevFiles, ...fileArray]);

    const imageArray = fileArray.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages: string[]) => [...prevImages, ...imageArray]);

    e.target.value = "";
  };

  const attachFile = selectedImages.map((image, index) => (
    <div
      className="flex items-center justify-between p-1 font-normal bg-gray-100 border border-gray-300 border-solid rounded-md"
      key={index}
    >
      <div className="w-full h-auto">
        <img
          src={image}
          alt={`Image Preview ${index}`}
          className="w-auto h-auto max-h-[128px]"
        />
      </div>
      <div>{selectedFiles[index].name}</div>
      <button onClick={() => removeFile(index)}>
        <IoCloseCircleOutline size="30" />
      </button>
    </div>
  ));

  const removeFile = (index: number) => {
    setSelectedImages((prevImages: string[]) =>
      prevImages.filter((_, i) => i !== index)
    );
    setSelectedFiles((prevFiles: File[]) =>
      prevFiles.filter((_, i) => i !== index)
    );
  };

  const registerFiles = async () => {
    // 여기에 파일 등록 로직을 추가
    // 서버로 파일을 업로드하거나 다른 처리를 수행할 수 있습니다.
    alert("파일이 등록되었습니다.");
  };

  return (
    <div>
      <div>첨부파일</div>
      <div className="flex w-full border border-solid rounded font-sm">
        {selectedImages.length !== 0 ? <div>{attachFile}</div> : null}
        {selectedImages.length === 0 && (
          <input
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
