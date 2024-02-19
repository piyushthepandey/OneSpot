import React, { ReactNode } from 'react';
import Carousel from 'react-material-ui-carousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './CarouselCont.css'; // Ensure this path is correct

type CarouselContProps = {
  slides: ReactNode[];
  setCurrentSlide: (index: number) => void;
  currentSlide: number;
};

const CarouselCont: React.FC<CarouselContProps> = ({ slides, setCurrentSlide, currentSlide }) => {
  return (
    <Carousel
      className='carousel'
      NavButton={({ onClick, next }) => {
        const handleNavButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
          onClick(event);
        };

        return (
          <div
            onClick={handleNavButtonClick}
            className={`carousel-nav-button ${next ? 'right' : 'left'}`}
          >
            <ArrowForwardIosIcon 
              style={{ fontSize: 34 }} 
              className={`fal fa-arrow-${next ? 'right' : 'left'}`} 
            />
          </div>
        );        
      }}
      IndicatorIcon={<div className='line'></div>}
      activeIndicatorIconButtonProps={{ className: 'active' }}
      interval={5000}
      onChange={(e) => {
        if (e !== undefined) {
          setCurrentSlide(e);
        }
      }}    >
      {slides}
    </Carousel>
  );
};


export default CarouselCont;
