import React, {
  MutableRefObject,
  useRef,
  ChangeEventHandler,
  ChangeEvent,
} from 'react';
import _ from 'lodash';
import styled from 'styled-components';

type Props = {
  id: string | number;
  style?: {};
  placeholder?: string;
  onChangeImg?: any;
  className?: string;
  images: { files: any; url: any };
};

const PhotoInput: React.FC<Props> = ({
  id,
  style,
  className,
  placeholder,
  images,
  onChangeImg,
}) => {
  const imgUploadInput = useRef() as MutableRefObject<HTMLInputElement>;
  const previewBoxRef = useRef<HTMLDivElement>(null);

  const handleSubmitImg = () => {
    imgUploadInput.current.click();
  };

  const handleImgChange: ChangeEventHandler = (e: any) => {
    e.stopPropagation();
    let reader = new FileReader();
    const uploadedImg = e.target.files[0];
    const imgUrl = URL.createObjectURL(uploadedImg);

    reader.onloadend = async () => {
      onChangeImg({
        files: { ...images.files, [`${id}`]: uploadedImg },
        url: { ...images.url, [`${id}`]: imgUrl },
      });
      _.uniqBy(images.files, id);
    };
    if (uploadedImg) {
      reader.readAsDataURL(uploadedImg);
    }
  };

  return (
    <div>
      <PreviewBox
        style={style}
        className={className}
        ref={previewBoxRef}
        onClick={handleSubmitImg}
      >
        {images.url[`${id}`] ? (
          <img alt='preview' src={images.url[`${id}`]} />
        ) : (
          <div>
            <span>{placeholder}</span>
          </div>
        )}
      </PreviewBox>
      <FileUploadInput
        type='file'
        accept='image/jpg, image/jpeg, image/png'
        onChange={handleImgChange}
        ref={imgUploadInput}
      />
    </div>
  );
};

export default PhotoInput;

const FileUploadInput = styled.input`
  display: none;
`;

const PreviewBox = styled.div`
  &.main-image {
    width: 300px;
    height: 300px;
  }

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
    width: 100%;
    height: 100%;
  }
`;
