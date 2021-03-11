import { useSelector }      from 'react-redux';
import { useParams }        from 'react-router';
import React                from 'react';

import useFetchData         from '../shared/hooks/fetchData-hook';
import usePostData          from '../shared/hooks/postData-hook';
import EmptyData            from '../shared/UIElements//EmptyData/EmptyData';

import AnnouncementsControl from './AnnouncementsControl';
import AnnouncementItem     from './AnnouncementItem';
import styles               from './Announcements.module.css';


const Announcements = () => {
  const { token, houseId, userId } = useSelector((state) => ({
    ...state.auth,
  }));
  const { post } = usePostData();
  const houseParam = useParams().houseId;
  const loadedData = useFetchData(
    `${process.env.REACT_APP_BACKEND_URL}/announcement/allByHouse/${
      houseParam || houseId
    }`
  );
  
  let announcements;

  const createAnnouncement = (announcement) => {
    const addFilter = (res) => {
      if (loadedData.data) {
        loadedData.setData((prevData) => [...prevData, res]);
      } else {
        loadedData.setData([res]);
      }
    };
    post(
      `${process.env.REACT_APP_BACKEND_URL}/announcement/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      announcement,
      addFilter
    );
  };

  if (loadedData.dataLoaded) {
    if (loadedData.data.length > 0) {
      announcements = loadedData.data.reverse().map((ann) => {
        return (
          <AnnouncementItem
            key={ann._id}
            title={ann.title}
            text={ann.body}
            img={ann.image}
            link={ann.link}
            date={ann.date}
          />
        );
      });
    } else {
      announcements = <EmptyData header="NO ANNOUNCEMENTS!" />;
    }
  }

  return (
    <div className={styles.announcementsDiv}>
      {userId ? (
        <AnnouncementsControl
          onCreate={createAnnouncement}
          houseParam={houseParam}
          token={token}
        />
      ) : null}
      <ul className={styles.groupList}>{announcements}</ul>
    </div>
  );
};

export default Announcements;
