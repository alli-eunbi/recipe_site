import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

const PhotoInput = ({ formData, id }) => {
  const [imgFileUrl, setImgFileUrl] = useState();

  const imgUploadInput = useRef(null);
  const previewBoxRef = useRef(null);

  const handleSubmitImg = () => {
    imgUploadInput.current.click();
  };

  const handleChangeImage = useCallback(
    (e) => {
      const selectedImg = e.currentTarget.files[0];
      const imgUrl = URL.createObjectURL(selectedImg);
      formData.append(`step${Number(id)}`, selectedImg);
      setImgFileUrl(imgUrl);
      for (var keys of formData.keys()) {
        console.log(keys);
      }
    },
    [imgFileUrl]
  );

  return (
    <div>
      <PreviewBox ref={previewBoxRef} onClick={handleSubmitImg}>
        {imgFileUrl ? (
          <img alt='preview' src={imgFileUrl} />
        ) : (
          <div>
            <span>요리 사진을 업로드 해주세요.</span>
          </div>
        )}
      </PreviewBox>
      <FileUploadInput
        type='file'
        accept='image/jpg, image/jpeg, image/png'
        ref={imgUploadInput}
        onChange={handleChangeImage}
      />
    </div>
  );
};

export default PhotoInput;

const FileUploadInput = styled.input`
  display: none;
`;

const PreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  justify-content: center;
  border: none;
  border-radius: 4px;
  margin: 0.5rem;
  text-align: center;
  background-color: #e3fbe3;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  & div > span {
    color: grey;
  }
  & > img {
    border-radius: 4px;
    opacity: 0.9;
  }
`;
