import React, { useRef, useCallback } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/button/Button';
import { PageLayout } from '../components/layout/PageLayout';
import { HighLight } from '../components/text/Highlight';
import axios from 'axios';

const UploadPage = () => {
  const [imgFileUrl, setImgFileUrl] = useState('');
  const [content, setContent] = useState('');
  const [uploadedImage, setUploadedImage] = useState({
    fileName: '',
    filePath: '',
  });

  const navigate = useNavigate();

  const uploadImgInput = useRef();
  const previewArea = useRef();

  const handleImgUpload = (e) => {
    e.preventDefault();
    uploadImgInput.current.click();
  };

  const handleImgChange = useCallback(
    (e) => {
      const uploadedImg = e.target.files[0];
      const imgUrl = URL.createObjectURL(uploadedImg);
      setImgFileUrl(imgUrl);
      setContent(e.target.files[0]);
    },
    [imgFileUrl]
  );

  const handleImgSubmit = (e) => {
    e.preventDefault();
    // navigate('/search');
    const formData = new FormData();

    formData.append('file', content);

    let variables = [
      {
        title: '1번',
        content: '1번 레시피 조리 순서입니다.',
      },
    ];

    formData.append(
      'data',
      new Blob([JSON.stringify(variables)], { type: 'application/json' })
    );

    axios
      .post('http://localhost:5000/recipe-board/register', formData)
      .then((res) => {
        const { fileName } = res.data;
        setUploadedImage({ fileName });
      });
  };

  return (
    <PageLayout>
      <Header>
        <h1>재료 사진 업로드</h1>
        <Instruction>
          가지고 계신 식재료들을 가지런히 하여,{' '}
          <HighLight>한장의 사진</HighLight>에 담아주세요!
        </Instruction>
        <Instruction>
          정확한 결과를 위해, 재료는 약간 떨어뜨려 주세요.
        </Instruction>
      </Header>
      <PhotoUploadContainer onSubmit={handleImgSubmit}>
        <PreviewBox ref={previewArea} onClick={handleImgUpload}>
          {imgFileUrl && <img alt='preview' src={imgFileUrl} />}
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
        <Button style={{ height: '2.5rem' }}>전송하기</Button>
      </PhotoUploadContainer>
    </PageLayout>
  );
};

export default UploadPage;

const Header = styled.header`
  margin: 3rem auto;

  & > h1,
  p {
    text-align: center;
  }

  & > h1 {
    margin-bottom: 1rem;
  }
`;

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

const PhotoUploadContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30rem;
  width: 30rem;
  top: 20%;
  left: 30%;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;
