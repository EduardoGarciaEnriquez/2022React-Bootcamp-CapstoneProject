import React, { useState, useEffect, useContext } from 'react'

import stateContext from '../../state/stateContext';
import Loader from '../loader/Loader';
import '../../stylesheets/homepage/content.scss';

function Slider() {
  const { banners, fetchingBanners } = useContext(stateContext)

  const [slideIndex, setSlideIndex] = useState(1)

  useEffect(() => {
    let slides = document.getElementsByClassName("slide");
    if (slideIndex > slides.length) { setSlideIndex(1) }
    if (slideIndex < 1) { setSlideIndex(slides.length) }
  }, [slideIndex]);

  return (
    <>
      {(banners.length !== 0 && fetchingBanners === false) ?
        <div className='slider-container'>
          {banners.results.map((slide, i) =>
            <div key={slide.id}
              className={(i === (slideIndex - 1)) ? 'slide fade show' : 'slide fade hide'}>
              <img alt="slide-img" src={slide.data.main_image.url} />
            </div>
          )}
          <button className="prev"
            onClick={() => setSlideIndex(slideIndex - 1)}
          >❮</button>
          <button className="next"
            onClick={() => setSlideIndex(slideIndex + 1)}
          >❯</button>
        </div>
        :
        <div className='slider-container' style={{ textAlign: 'center' }}>
          <Loader />
        </div>
      }
    </>
  )
}

export default Slider