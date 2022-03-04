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
import {
  useRecoilState,
  useRecoilStateLoadable,
  useSetRecoilState,
} from 'recoil';
import { useNavigate } from 'react-router-dom';
import { fileAtom } from '../../store/store';
import { searchAtom } from '../../store/store';

import { useQuery } from 'react-query';
import { fetchImageSearchResult } from '../../api/recipes';

export let formData = new FormData();

const PhotoSearchUploader: React.FC = () => {
  const [imgFileUrl, setImgFileUrl] = useState('');
  const [content, setContent] = useRecoilState(fileAtom);
  const [searchResult, setSearchResult] = useRecoilStateLoadable(searchAtom);

  const navigate = useNavigate();

  const uploadImgInput = useRef<HTMLInputElement>(null as any);
  const previewArea = useRef<HTMLDivElement>(null);

  const handleImgUpload: MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    uploadImgInput.current.click();
  };
  const { data, status, refetch } = useQuery(
    'image-search',
    () => fetchImageSearchResult(formData),
    {
      cacheTime: 0,
      enabled: false,
    }
  );

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
    refetch();
    setSearchResult({
      ['recipes']: data?.data.recipes,
      ['ingredients']: data?.data.ingredients,
    });

    navigate('/search-result');
  };

  useEffect(() => {
    formData = new FormData();
    setSearchResult({ recipes: [], ingredients: [] });
  }, []);

  return (
    <PhotoUploadContainer onSubmit={handleImgSubmit}>
      <PreviewBox ref={previewArea} onClick={handleImgUpload}>
        {imgFileUrl && (
          <img
            alt='preview'
            style={{ width: '100%', height: '100%' }}
            src={imgFileUrl}
          />
        )}
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
export default PhotoSearchUploader;

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
