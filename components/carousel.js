import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(1);
    const settings = {
        dots: false,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 3,
        variableWidth: true,
        afterChange: (index) => {
            // console.log(index + 2);
            setActiveSlideIndex(index + 2);
        },
    };
    return (
        <div className='carousel'>
            <Slider {...settings}>
                <div>
                    <img src='https://e3.365dm.com/23/03/2048x1152/skynews-dog-police-dogs_6077454.jpg' />
                </div>
                <div>
                    <img src='http://placekitten.com/g/400/200' />
                </div>
                <div>
                    <img
                        src='https://www.rspca.org.uk/documents/1494939/0/1169530-sheep-in-field-banner_990x350.jpg/aac62a96-3742-5662-5799-134016387afc?t=1651747285142'
                        className='activeImage'
                    />
                </div>
                <div>
                    <img src='https://www.ciwf.org.uk/media/7430330/sheep-closeup-eating-grass.jpg?anchor=center&mode=crop&width=730&height=400&&rnd=131364863080000000' />
                </div>
                <div>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/8/8c/Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg' />
                </div>
                <div>
                    <img src='https://www.ucdavis.edu/sites/default/files/styles/sf_landscape_16x9/public/home-site/blogs/one-health/blog-posts/2018/cow-field-one-health-uc-davis.jpg?h=c74750f6&itok=hQ2gfqOw' />
                </div>
                <div>
                    <img src='https://media.newyorker.com/photos/62506f4239f6a81b959af989/1:1/w_2000,h_2000,c_limit/brody-cow.jpg' />
                </div>
                <div>
                    <img src='https://www.mammal.org.uk/wp-content/uploads/2019/02/Red-fox-Katie-Nethercoat.jpg' />
                </div>
                <div>
                    <img src='https://www.nature.scot/sites/default/files/styles/max_1300x1300/public/2022-05/RedFox-FGD8284_Original%20Image_m276208.jpg?itok=9nr0luey' />
                </div>
                <div>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/8/83/Iceland-1979445_%28cropped_3%29.jpg' />
                </div>
                <div>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg' />
                </div>
                <div>
                    <img src='https://media.audubon.org/styles/article_hero_inline/s3/tufted_titmouse._photo_deborah_bifulco_great_backyard_bird_count.jpg?itok=3_ydkTV-' />
                </div>
            </Slider>
            <div className='carousel-indicator'>{`00${activeSlideIndex} / 012`}</div>
        </div>
    );
};

export default Carousel;
