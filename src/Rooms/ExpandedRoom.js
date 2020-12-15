import React, { useRef, useEffect } from 'react';

import styles from './ExpandedRoom.module.css';
import PersonName from './PersonName';

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
const ExpandedRoom = (props) => {
  const roomFocus = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: roomFocus.current.offsetTop - 50,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Card ref={roomFocus} className={styles.roomCard}>
      <Carousel controls={false} interval={3000} className={styles.caro}>
        {props.img.map((img) => {
          return (
            <Carousel.Item key={img} className={styles.caroItem}>
              <img className="d-block w-100" src={img} alt={img} />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <h2 className={styles.roomTitle}>{props.room}</h2>
      {props.people.map((person) => {
        return (
          <PersonName
            valid={person.validity}
            name={person.name}
            key={person.name}
          />
        );
      })}
    </Card>
  );
};

export default ExpandedRoom;
