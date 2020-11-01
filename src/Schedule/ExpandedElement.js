import React from 'react';

import Carousel from 'react-bootstrap/Carousel';

import styles from './ExpandedElement.module.css';

const ExpandedElement = (props) => {
  if (props.rooms) {
    return (
      <div className={styles.expandedDiv}>
        <h1>{props.person}</h1>
        <h4>Šią savaite tvarkote: </h4>
        <h3>{props.rooms.roomName}</h3>

        {props.rooms.map((room) => {
          return (
            <div key={room.name} className={styles.imgDiv}>
              {room.images.map((img) => {
                return <img src={img} key={img} alt={img} />;
              })}
              <h5>{room.name}</h5>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={styles.expandedDiv}>
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

{
  /* <Carousel controls={false} className={styles.caro}>
{room.images.map((img) => {
  return (
    <Carousel.Item key={img} className={styles.caroItem}>
      <img className="d-block w-100" src={img} alt={img} />
    </Carousel.Item>
  );
})}
</Carousel> */
}
{
  /* {props.rooms.roomImages.map((img) => {
        return <img src={img} key={img} />;
      })} */
}
