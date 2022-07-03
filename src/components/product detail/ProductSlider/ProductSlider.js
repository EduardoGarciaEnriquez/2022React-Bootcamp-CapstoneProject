import React, { useState, useEffect } from 'react'

function ProductSlider({ images }) {
    const [slideIndex, setSlideIndex] = useState(1)

    useEffect(() => {
        let slides = document.getElementsByClassName("slide");
        if (slideIndex > slides.length) { setSlideIndex(1) }
        if (slideIndex < 1) { setSlideIndex(slides.length) }
    }, [slideIndex]);

    return (
        <div className='slider-container'>
            {images.map((slide, i) =>
                <div key={'product-img-' + i}
                    className={(i === (slideIndex - 1)) ? 'slide fade show' : 'slide fade hide'}>
                    <img alt="slide-img" src={slide.image.url} />
                </div>
            )}
            <button className="prev"
                onClick={() => setSlideIndex(slideIndex - 1)}
            >❮</button>
            <button className="next"
                onClick={() => setSlideIndex(slideIndex + 1)}
            >❯</button>
        </div>
    )
}

export default ProductSlider