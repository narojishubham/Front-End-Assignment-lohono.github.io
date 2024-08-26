import React, { useState, useEffect } from 'react';
import './DogCarousel.css';
import { fetchDogBreeds } from '../api/api';

export type Dog = Root2[];

export interface Root2 {
  breeds: Breed[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface Breed {
  weight: Weight;
  height: Height;
  id: number;
  name: string;
  country_code?: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  origin?: string;
  reference_image_id: string;
}

export interface Weight {
  imperial: string;
  metric: string;
}

export interface Height {
  imperial: string;
  metric: string;
}

const DogCarousel: React.FC = () => {
  const [data, setData] = useState<Dog>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    const loadDogs = async () => {
        setLoading(true); 
      try {
        const response = await fetchDogBreeds();
        setLoading(false); 
        setData(response);
      } catch (error) {
        setLoading(false); 
        console.error('Error fetching dog breeds:', error);
      }
    };
    loadDogs();
  }, []);

  const itemsPerPage = 3; 
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalPages) % totalPages
    );
  };

  const startIndex = currentIndex * itemsPerPage;
  const visibleData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <div style={{    fontSize: '1.7rem',
    fontWeight: 800}}>Dog Breeds.</div>
        <div>Everyday is a Dog Day.</div>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
      <div className="carousel">
        <button className="carousel-button prev" onClick={prevSlide}>
          &#10094;
        </button>
        <div className="carousel-content">
          {visibleData.map((item, index) => (
            <div key={index} className="carousel-item">
              <img src={item.url} alt={item.breeds[0].name} />
              <div style={{padding:'0 1rem'}}>
                <div style={{    fontWeight: 800,
    fontSize: '1.8rem'}}>{item.breeds[0].name}</div>
                <div>{item.breeds[0].origin || 'Panjim Goa'}</div>
                <div style={{    paddingTop: '1.6rem',display:'flex'}}><div style={{fontWeight:800,paddingRight:'.2rem'}}>Life Span:</div> {item.breeds[0].life_span}</div>
                <div  style={{  display:'flex'}}><div style={{fontWeight:800,paddingRight:'.2rem'}}>Temperament:</div>{item.breeds[0].temperament}</div>
                <div style={{  display:'flex'}}><div style={{fontWeight:800,paddingRight:'.2rem'}}>Bred For:</div>{item.breeds[0].bred_for}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-button next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>)}
    </div>
  );
};

export default DogCarousel;
