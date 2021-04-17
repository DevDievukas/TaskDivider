import axios            from 'axios'
import { Formik }       from 'formik'
import { PlusCircle }   from 'phosphor-react'
import {
  useEffect,
  useState,
}                       from 'react'
import React 						from 'react'

import Button 					from '../shared/FormElements/Button'
import Input 						from '../shared/FormElements/Input'
import { Form }         from '../shared/styled-components/shared'

import { Image }        from './styled'
import ImagePicker      from './ImagePicker'
import styles           from './AnnouncementsControl.module.css'

const AnnouncementForm = (props) => {
  const { createAnnouncementHandler, token } = props
  const [image, setImage] = useState()
  const [uploadedImage, setUploadedImage] = useState()
  const [images, setImages] = useState()
  const [showImagePicker, setShowImagePicker] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line max-len
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/announcement/images/${process.env.REACT_APP_ANOUNCEMENTS_IMAGES_ID}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    ).then(({ data }) => {
      setImage(data[0])
      setImages(data)
    })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (!uploadedImage) {
      return
    }
    const fileReader = new FileReader()

    fileReader.onload = () => {
      setImage(fileReader.result)
    }
    fileReader.readAsDataURL(uploadedImage[0])
  }, [uploadedImage])

  const changeImage = ({ image, index }) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    newImages.unshift(image)
    setImages(newImages)
    setImage(image)
    setShowImagePicker(false)
  }

  const changeUploadImage = (image) => {
    setUploadedImage(image)
    setShowImagePicker(false)
  }

  return (
    <React.Fragment>
      {showImagePicker ?
        <ImagePicker
          images={images}
          pickHandler={changeImage}
          uploadHandler={changeUploadImage}
          cancel={() => setShowImagePicker(false)}
        /> :
        <Formik
          initialValues={{
            title: '',
            body:  '',
          }}
          onSubmit={async ({ title, body }) => {
            if (!uploadedImage) {
              createAnnouncementHandler(title, body, image)
            } else {
              createAnnouncementHandler(title, body, null, uploadedImage)
            }
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => ( 
            <Form onSubmit={handleSubmit}>
              <div
                className={styles.div}
                onClick={() => setShowImagePicker(true)}
              >
                <PlusCircle size={44} className={styles.plus}/>
                <Image src={image} />
              </div>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                id="title"
                name="title"
                type="input"
                title="ANNOUNCEMENT TITLE" />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.body}
                id="body"
                name="body"
                type="text"
                title="ANNOUNCEMENT" />
              <Button type="submit">
                CREATE!
              </Button>
            </Form>
          )}
        </Formik> }
    </React.Fragment>
  )
}

export default AnnouncementForm