import React from 'react';

import GroupElement from './GroupElement';

import './Main.css';

const Main = () => {
  const DUMMY_GROUPS = [
     {
      groupName: 'Pirma grupė',
      members: {
        1: 'Norbertas',
        2: 'Robertas',
        3: 'Aurimas',
        4: 'Darius'
      },
      tasks: {
        1: {
          image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
          description: 'reikia susitvarkyti kambary 1',
          completed: false
        },
        2: {
          image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
          description: 'reikia susitvarkyti kambary 2 ',
          completed: false
        },
        3: {
          image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
          description: 'reikia susitvarkyti kambary 3 ',
          completed: false
        },
        4: {
          image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
          description: 'reikia susitvarkyti kambary 4',
          completed: false
        }
      },
      groupId: 1
    },
    {
      groupName: 'Antra grupė',
      members: {
        1: 'Norbertas',
        2: 'Robertas',
        3: 'Aurimas',
        4: 'Darius'
      },
      tasks: {
        1: {
          image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
          description: 'reikia susitvarkyti kambary 1',
          completed: false
        },
        2: {
          image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
          description: 'reikia susitvarkyti kambary 2 ',
          completed: false
        },
        3: {
          image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
          description: 'reikia susitvarkyti kambary 3 ',
          completed: false
        },
        4: {
          image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
          description: 'reikia susitvarkyti kambary 4',
          completed: false
        }
      },
      groupId: 2
    },
   {
      groupName: 'Trečia grupė',
      members: {
        1: 'Norbertas',
        2: 'Robertas',
        3: 'Aurimas',
        4: 'Darius'
      },
      tasks: {
        1: {
          image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
          description: 'reikia susitvarkyti kambary 1',
          completed: false
        },
        2: {
          image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
          description: 'reikia susitvarkyti kambary 2 ',
          completed: false
        },
        3: {
          image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
          description: 'reikia susitvarkyti kambary 3 ',
          completed: false
        },
        4: {
          image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
          description: 'reikia susitvarkyti kambary 4',
          completed: false
        }
      },
      groupId: 3
    }
  ]

  // return <GroupElement group={DUMMY_GROUPS.one}/>

  return (
    <ul className="groups-list">
      {DUMMY_GROUPS.map((group) => {
        return (
          <GroupElement
            key={group.groupId}
            id={group.groupId}
            group={group}
          />
        );
      })}
    </ul>
  );
}

export default Main;