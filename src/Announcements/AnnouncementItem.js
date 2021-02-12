import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

import styles from './AnnouncementItem.module.css';

const AnnouncementItem = (props) => {
  const { img, title, text, date, link } = props;

  const parsedDate = date.substr(0, 10);

  return (
    <Card style={{ width: '100%' }} className={styles.card}>
      <Card.Img variant="top" src={img} className={styles.image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <p className={styles.date}>{parsedDate}</p>
        {link ? (
          <Link to={link.direction} className={styles.link}>
            {link.text}
          </Link>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default AnnouncementItem;
