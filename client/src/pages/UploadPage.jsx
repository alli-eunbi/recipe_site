import React, {
  useEffect,
  useRef,
  MouseEventHandler,
  useCallback,
} from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [imgFileUrl, setImgFileUrl] = useState('');

  const uploadImgInput = useRef();
  const previewArea = useRef();

  const handleImgChange = useCallback(
    (e) => {
      const uploadedImg = e.target.files[0];
      const imgUrl = URL.createObjectURL(uploadedImg);
      setImgFileUrl(imgUrl);
    },
    [imgFileUrl]
  );

  const handleImgSubmit = (e) => {
    e.preventDefault();
    uploadImgInput.current.click();
    // const imgData = new FormData();
    // imgData.append('file', e.target.files[0]);
  };

  return (
    <main>
      <PhotoUploadContainer>
        <PreviewBox ref={previewArea} onClick={handleImgSubmit}>
          {imgFileUrl && <img src={imgFileUrl}></img>}
          {!imgFileUrl && (
            <div>
              <span>이미지를 업로드 해주세요.</span>
            </div>
          )}
        </PreviewBox>
        <PhotoUploder
          ref={uploadImgInput}
          type='file'
          onChange={handleImgChange}
        />
        <Button>전송하기</Button>
      </PhotoUploadContainer>
    </main>
  );
};

export default UploadPage;

const PreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 400px;
  margin: 0.5rem;
  text-align: center;
  background-color: #e3fbe3;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  & > span {
    color: grey;
  }
  & > img {
    border-radius: 4px;
  }
`;

const PhotoUploder = styled.input`
  display: none;
`;

const PhotoUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 30rem;
  width: 30rem;
  top: 20%;
  left: 30%;
  margin: 20px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;
