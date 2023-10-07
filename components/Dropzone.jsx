import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
const Dropzone = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageTemp, setProfileImageTemp] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div>
      {" "}
      <div className="bg-red-500" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
