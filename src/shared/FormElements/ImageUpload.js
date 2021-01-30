import React, { useRef, useState, useEffect } from 'react';
import Button from './Button';

import styles from './ImageUpload.module.css';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file[0]);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile = [];
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length > 0) {
      pickedFile = event.target.files;
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      console.log(pickedFile.length);
    } else {
      fileIsValid = false;
      setIsValid(false);
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <div className={styles.formControl}>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        multiple
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />
      <div className={`${styles.imageUpload} ${props.center && 'center'}`}>
        <div className={styles.imageUploadPreview}>
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
