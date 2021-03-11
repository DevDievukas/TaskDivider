import {
  useRef,
  useState,
  useEffect
}                     from 'react';
import { PlusCircle } from 'phosphor-react';
import React          from 'react';

import styles         from './ImageUpload.module.css';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    // fileReader.readAsDataURL(file);
    fileReader.readAsDataURL(file[0]);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;

    // if (event.target.files && event.target.files.length === 1) {
    //   pickedFile = event.target.files[0];
    //   setFile(pickedFile);
    // }

    if (event.target.files && event.target.files.length > 0) {
      pickedFile = event.target.files;
      setFile(pickedFile);
    }
    props.setFiles(event);
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
      <div
        className={`${styles.imageUpload} ${props.center && 'center'} ${
          props.className
        }`}
      >
        <div className={styles.imageUploadPreview} onClick={pickImageHandler}>
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <PlusCircle size={144} className={styles.plus} />}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
