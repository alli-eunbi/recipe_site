import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  MouseEventHandler,
  FormEventHandler,
} from 'react';
import styled from 'styled-components';
import Button from '../ui/button/Button';
import { useRecoilState, useRecoilStateLoadable } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { fileState } from '../../store/store';
import { recipesState } from '../../store/store';
import { animation } from '../../styles/animation';

export let formData = new FormData();

const ImageSearchUploader: React.FC = () => {
  const [imgFileUrl, setImgFileUrl] = useState('');
  const [content, setContent] = useRecoilState(fileState);
  const [searchResult, setSearchResult] = useRecoilStateLoadable(recipesState);

  const navigate = useNavigate();

  const uploadImgInput = useRef<HTMLInputElement>(null as any);
  const previewArea = useRef<HTMLDivElement>(null);

  const handleImgUpload: MouseEventHandler<HTMLInputElement> = (e) => {
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

  const handleImgSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    formData.append('file', content);
    navigate('/search-result');
  };

  useEffect(() => {
    formData = new FormData();
    setSearchResult([]);
  }, []);

  return (
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
      <Button className='submit'>전송하기</Button>
    </PhotoUploadContainer>
  );
};
export default ImageSearchUploader;

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
  animation: fadeIn 0.5s ease-out forwards;
  ${animation};

  @media (max-width: 768px) {
    width: 20rem;
    height: 30rem;

    > div {
      width: 20rem;
      height: 30rem;
    }
  }
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
  transition: 200ms ease;

  &:hover {
    background-color: #d5e5d3;
  }

  & > span {
    color: grey;
  }
  & > img {
    border-radius: 4px;
    opacity: 0.9;
    width: 100%;
    height: 100%;
  }
`;

const PhotoUploder = styled.input`
  display: none;
`;
