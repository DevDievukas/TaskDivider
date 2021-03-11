import { Link } from 'react-router-dom';
import React    from 'react';

import styles   from './AnnouncementItem.module.css';

const AnnouncementItem = (props) => {
  const { img, title, text, date, link } = props;

  const parsedDate = date.substr(0, 10);

  return (
    <div className={styles.card}>
      <img variant="top" src={img} alt={title} className={styles.image} />
      <div className={styles.cardBody}>
        <h3>{title}</h3>
        <p>{text}</p>
        <p className={styles.date}>{parsedDate}</p>
        {link ? (
          <Link to={link.direction} className={styles.link}>
            {link.text}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default AnnouncementItem;
