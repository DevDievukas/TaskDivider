import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

import styles from './AnnouncementItem.module.css';

const AnnouncementItem = (props) => {
  return (
    <Card style={{ width: '100%' }} className={styles.card}>
      <Card.Img variant="top" src={props.img} className={styles.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.text}</Card.Text>
        <p className={styles.date}>{props.date}</p>
        {props.link ? (
          <Link to={props.link.direction} className={styles.link}>
            {props.link.text}
          </Link>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default AnnouncementItem;
