import React, { MutableRefObject, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

type Props = {
  formData: FormData;
  id: string | number;
  style?: {};
};

const PhotoInput: React.FC<Props> = ({ formData, id, style }) => {
  const [imgFileUrl, setImgFileUrl] = useState<string>();

  const imgUploadInput = useRef() as MutableRefObject<HTMLInputElement>;
  const previewBoxRef = useRef<HTMLDivElement>(null);

  const handleSubmitImg = () => {
    imgUploadInput.current.click();
  };

  const handleChangeImage = useCallback(
    (e) => {
      const selectedImg = e.currentTarget.files[0];
      const imgUrl = URL.createObjectURL(selectedImg);
      formData.append(`step${Number(id)}`, selectedImg);
      setImgFileUrl(imgUrl);
    },
    [imgFileUrl]
  );

  return (
    <div>
      <PreviewBox style={style} ref={previewBoxRef} onClick={handleSubmitImg}>
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
