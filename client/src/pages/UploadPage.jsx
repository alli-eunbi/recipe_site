import React, { useRef, useCallback } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { PageLayout } from '../components/layout/PageLayout';
import { Title } from '../components/text/Title';

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
    <PageLayout>
      <Title>재료 사진 업로드</Title>
      <Instruction>
        가지고 계신 식재료들을 가지런히 하여, 한장의 사진에 담아주세요!
      </Instruction>
      <PhotoUploadContainer>
        <PreviewBox ref={previewArea} onClick={handleImgSubmit}>
          {imgFileUrl && <img alt='preview image' src={imgFileUrl}></img>}
          {!imgFileUrl && (
            <div>
              <span>재료 사진 한장을 업로드 해주세요.</span>
            </div>
          )}
        </PreviewBox>
        <PhotoUploder
          ref={uploadImgInput}
          type='file'
          onChange={handleImgChange}
        />
        <Button onClick={() => console.log('clicked')}>전송하기</Button>
      </PhotoUploadContainer>
    </PageLayout>
  );
};

export default UploadPage;

const Instruction = styled.p`
  font-size: 1.2rem;
`;

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
    opacity: 0.9;
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
  height: 30rem;
  width: 30rem;
  top: 20%;
  left: 30%;
  margin: 20px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;
