import {
  Field,
  Form,
  Formik
}											 	from 'formik'
import {
  shallowEqual,
  useSelector
}                       from 'react-redux'
import React 						from 'react'

import Button 					from '../shared/FormElements/Button'
import Input 						from '../shared/FormElements/Input'
import useFetchData     from '../shared/hooks/fetchData-hook'

import styles 					from './AnnouncementsControl.module.css'

const AnnouncementForm = (props) => {
  const { createAnnouncementHandler } = props
  const token = useSelector((state) =>
    (state.auth.token),
  shallowEqual
  );
  const loadedData = useFetchData(
    `${process.env.REACT_APP_BACKEND_URL}/announcement/images/${process.env.REACT_APP_ANOUNCEMENTS_IMAGES_ID}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  )

  let imagesRadio
  if (loadedData.data.length > 0) {
    let checked = false
    imagesRadio = loadedData.data.map((img) => {
      if (checked) {
        return (
          <div key={img} className={styles.radioDiv}>
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
              <img src={img} alt="announcement" className={styles.img} />
            </label>
          </div>
        )
      }
    })
  }

  return (
    <Formik
      initialValues={{
        title: '',
        body: '',
        image: loadedData[0] || '',
      }}
      onSubmit={async ({title, body, image}) => {
        createAnnouncementHandler(title, body, image)
      }}
    >
      {() => (
        <Form className={styles.form}>
          <Input
            id="title"
            name="title"
            type="input"
            title="ANNOUNCEMENT TITLE"
          />
          <Input id="body" name="body" type="text" title="ANNOUNCEMENT" />
          <Button type="submit" className={styles.button}>
              CREATE!
          </Button>
          <div className={styles.outerRadioDiv}>{imagesRadio}</div>
        </Form>
      )}
    </Formik>
  )
}

export default AnnouncementForm