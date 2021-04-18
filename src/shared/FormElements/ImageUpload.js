import {
  useRef,
  useState,
  useEffect,
}                     from 'react'
import { PlusCircle } from 'phosphor-react'
import React          from 'react'

import styles         from './ImageUpload.module.css'

const ImageUpload = (props) => {
  const { button, center, className, id, multiple, setFiles, single } = props
  const [file, setFile] = useState()
  const [previewUrl, setPreviewUrl] = useState()
  const filePickerRef = useRef()

  useEffect(() => {
    if (!file) {
      return
    }
    const fileReader = new FileReader()

    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    if(single){
      fileReader.readAsDataURL(file);
    } else {
      fileReader.readAsDataURL(file[0])
    } 
  }, [file])

  const pickedHandler = (event) => {
    let pickedFile

    if (single) {
      if (event.target.files && event.target.files.length === 1) {
        pickedFile = event.target.files[0];
        setFile(pickedFile);
      }
    } else {
      if (event.target.files && event.target.files.length > 0) {
        pickedFile = event.target.files
        setFile(pickedFile)
      }
    }
    setFiles(event)
  }

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }
  return (
    <React.Fragment>
      {button ?
        <div
          type='button'
          className={styles.button}
          onClick={pickImageHandler}
        >
          UPLOAD
        </div> :
        <div
          className={`${styles.imageUpload} ${center && 'center'} ${
            className
          }`}
        >
          <div className={styles.imageUploadPreview} onClick={pickImageHandler}>
            {previewUrl && <img src={previewUrl} alt="Preview" />}
            {!previewUrl && <PlusCircle size={144} className={styles.plus} />}
          </div>
        </div> }
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        multiple={multiple && 'multiple'}
        single={single && 'single'}
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />
    </React.Fragment>
  )
}

export default ImageUpload
