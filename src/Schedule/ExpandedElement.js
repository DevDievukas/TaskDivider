import React, { useRef, useEffect } from 'react';

import Carousel from 'react-bootstrap/Carousel';

import styles from './ExpandedElement.module.css';

const ExpandedElement = (props) => {
  useEffect(() => {
    window.scrollTo({
      top: focus.current.offsetTop - 50,
      behavior: 'smooth',
    });
  });

  const focus = useRef(null);
  if (props.rooms.length > 0) {
    return (
      <div ref={focus} className={styles.expandedDiv}>
        <h1>{props.person}</h1>
        <h4>Šią savaite tvarkote: </h4>

        {props.rooms.map((room) => {
          return (
            <div key={room.roomName} className={styles.imgDiv}>
              {/* <Carousel
                controls={false}
                interval={3000}
                className={styles.caro}
              >
                {room.images.map((img) => {
                  return (
                    <Carousel.Item key={img} className={styles.caroItem}> */}
              <img
                className="d-block w-100"
                src={`${process.env.REACT_APP_ASSET_URL}/${room.image}`}
                alt={room.image}
              />
              <h5>{room.roomName}</h5>
              {/* </Carousel.Item>
                  );
                })}
              </Carousel> */}
            </div>
          );
          // );
        })}
      </div>
    );
  } else {
    return (
      <div ref={focus} className={styles.expandedDiv}>
        <h1>{props.person}</h1>
        <img
          src="https://image.freepik.com/free-vector/boy-bed-snoring_1308-5347.jpg"
          alt="resting"
        />
        <p>Šią savaite ilsitės</p>
      </div>
    );
  }
};

export default ExpandedElement;
