import React from 'react';
import Card from '../components/Card';
import { useState } from 'react';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files;
    setSelectedFile(file);
    console.log(file);
    console.log(selectedFile[0].name);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.apppend('Image to Send', selectedFile, selectedFile.name);

    console.log(formData);
  };

  return (
    <main>
      <Card type='upload'>
        <input type='file' onChange={handleChange} />
        <button onClick={handleSubmit}>전송하기</button>
      </Card>
    </main>
  );
};

export default UploadPage;
