import React from 'react';

import Task from './Task';

const MyTasks = () => {
  
  const DUMMY_DATA = {
    image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
    name: 'Norbertas',
    description: 'reikia susitvarkyti kambary',
  };

  
{/* <Task img={DUMMY_DATA.image} title={DUMMY_DATA.name} description={DUMMY_DATA.description}/> */}

  return (
    <div id="carouselExampleIndicators" className="carousel slide">
    <ol className="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <Task img={DUMMY_DATA.image} title={DUMMY_DATA.name} description={DUMMY_DATA.description}/>
      </div>
      <div className="carousel-item">
        <Task img={DUMMY_DATA.image} title={DUMMY_DATA.name} description={DUMMY_DATA.description}/>
      </div>
      <div className="carousel-item">
        <Task img={DUMMY_DATA.image} title={DUMMY_DATA.name} description={DUMMY_DATA.description}/>
      </div>
    </div>
    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
)
}

export default MyTasks;