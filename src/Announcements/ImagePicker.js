import {
  Field,
  Formik,
}											 	from 'formik'
import { useState }     from 'react'
import React 						from 'react'

import Button 					from '../shared/FormElements/Button'
import ImageUpload      from '../shared/FormElements/ImageUpload'
import {
  ButtonContainer,
  Form,
}                       from '../shared/styled-components/shared'

import styles 					from './AnnouncementsControl.module.css'

const ImagePicker = (props) => {
  const { cancel, images, pickHandler, uploadHandler } = props
  const [checkedImage, setCheckedImage] = useState(images[0] ? {
    image: images[0],
    index: 0,
  } : null)

  let imagesRadio
  if (images.length > 0) {
    imagesRadio = images.map((image, index) => {
      const imageValue = {
        image,
        index,
      }
      return (
        <div
          onClick={() => setCheckedImage(imageValue)}
          key={index}
          className={styles.radioDiv}>
          <label>
            <Field
              type="radio"
              name="image"
              value={imageValue}
              className={styles.radio}
              checked={index === checkedImage.index}
            />
            <img src={image} alt="announcement" className={styles.img} />
          </label>
        </div>
      )
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    pickHandler(checkedImage)
  }

  return (
    <Formik>
      <Form onSubmit={submitHandler}>
        <div className={styles.outerRadioDiv}>
          {imagesRadio}
        </div>
        <ButtonContainer>
          <Button
            danger
            type='button'
            onClick={() => cancel()}
          >
                  CANCEL
          </Button>
          <Button type='submit'>
                  PICK
          </Button>
          <ImageUpload
            type='button'
            button
            single
            className={styles.imgUpload}
            id='uploadedImage'
            setFiles={(event) => {
              uploadHandler(event.currentTarget.files)
            }}
          />
        </ButtonContainer>
      </Form>
    </Formik>
  )
}

export default ImagePicker