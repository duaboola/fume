import React,{useState} from 'react'
import classes from './gallery.module.css'
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Space from '~/components/Layout/Client/Space';

// set src and original both , src to main image and original to show in lightbox
const images = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    original: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    width: 320,
    height: 174,
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    original: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    width: 320,
    height: 212,
  },
  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    original: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 320,
    height: 212,
  },
  {
    src: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
    original: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
    width: 320,
    height: 213,
  },
  {
    src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    original: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    width: 320,
    height: 183,
  },
  {
    src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
    original: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
    width: 240,
    height: 320,
  },
  {
    src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
    original: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
    width: 320,
    height: 190,
  },
  {
    src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
    original: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
    width: 320,
    height: 148,
    tags: [{ value: "People", title: "People" }],
  },
  {
    src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
    original: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
    width: 320,
    height: 213,
  },
  {
    src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
    original: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
    alt: "Big Ben - London",
    width: 248,
    height: 320,
  },
  {
    src: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg",
    original: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg",
    alt: "Red Zone - Paris",
    width: 320,
    height: 113,
  },
  {
    src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
    original: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
    alt: "Wood Glass",
    width: 313,
    height: 320,
  },
  {
    src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
    original: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
    width: 320,
    height: 213,
  },
  {
    src: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg",
    original: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg",
    width: 320,
    height: 194,
  },
];

const GalleryPage = () => {
  const [index, setIndex] = useState(-1);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index, item) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);
  return (
    <>
    <Space/>
    <div className={`container-fluid px-0 ${classes.galleryPage}`}>
      <div className="custom_container px-0">
        <div className="row justify-content-center pb-md-5 pt-md-5">  
          <div className='col-lg-10 col-xl-8 my-lg-5 px-0'>
            <Gallery
              images={images}
              onClick={handleClick}
              enableImageSelection={false}
              rowHeight={240}
              margin={0}
            />
            {!!currentImage && (
              /* @ts-ignore */
              <Lightbox
                mainSrc={currentImage.original}
                imageTitle={currentImage.caption}
                mainSrcThumbnail={currentImage.src}
                nextSrc={nextImage.original}
                nextSrcThumbnail={nextImage.src}
                prevSrc={prevImage.original}
                prevSrcThumbnail={prevImage.src}
                onCloseRequest={handleClose}
                onMovePrevRequest={handleMovePrev}
                onMoveNextRequest={handleMoveNext}
              />
            )}
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default GalleryPage