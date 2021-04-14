import {
  Field,
  Formik,
}											 	from 'formik'
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


  const hendleDoubleClick = (event) => {
    console.log(event)
    if (event.detail > 1) {
      console.log('double click')
    }
  }

  let imagesRadio
  if (images.length > 0) {
    let checked = false
    imagesRadio = images.map((img) => {
      if (checked) {
        return (
          <div
            key={img}
            className={styles.radioDiv}
            onClick={hendleDoubleClick}>
            <label>
              <Field
                type="radio"
                name="image"
                value={img}
                className={styles.radio}
              />
              <img src={img} alt="announcement" className={styles.img} />
            </label>
          </div>
        )
      } else {
        checked = true
        return (
          <div key={img} className={styles.radioDiv}>
            <label>
              <Field
                type="radio"
                name="image"
                value={img}
                className={styles.radio}
                checked
              />
              <img src={img} alt="announcement" className={styles.img}/>
            </label>
          </div>
        )
      }
    })
  }

  return (
    <Formik
      initialValues={{
        image: images[0] || '',
      }}
      onSubmit={async ({ image }) => {
        pickHandler(image)
      }}
      render={({
        handleSubmit,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <div className={styles.outerRadioDiv}>
              {imagesRadio}
            </div>
            <ButtonContainer>
              <Button
                danger
                type='button'
                onClick={() => cancel()}
              >CANCEL</Button>
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
        )
      }} 
    />
  )
}

export default ImagePicker