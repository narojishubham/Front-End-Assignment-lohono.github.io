import React, { useEffect, useState } from 'react';
import './DogTable.css';

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

const API_KEY = 'live_GhXL2pki6pFpAKEfE69Ddrr8AJBlF6kog2F0BNYBbYSloX9FXmcolr1mXK5Ni8QN';
const BASE_URL = 'https://api.thedogapi.com/v1/images/search';

const DogTable: React.FC = () => {
  const [dogs, setDogs] = useState<Dog>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    const loadDogs = async () => {
      setLoading(true); 
      try {
        const response = await fetch(
          `${BASE_URL}?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page}&limit=10`,
          {
            headers: {
              'x-api-key': API_KEY,
            },
          }
        );
        const data: Dog = await response.json();
        setDogs(data);
      } catch (error) {
        console.error('Error fetching dog breeds:', error);
      } finally {
        setLoading(false); 
      }
    };
    loadDogs();
  }, [page]);

  const renderTableRows = () => {
    return dogs.map((item, index) => (
      <tr key={index}>
        <td>{item.breeds[0].name}</td>
        <td>{item.breeds[0].height.metric}</td>
        <td>{item.breeds[0].breed_group}</td>
        <td>{item.breeds[0].life_span}</td>
        <td>{item.breeds[0].temperament}</td>
        <td>{item.breeds[0].origin || 'Panjim Goa'}</td>
      </tr>
    ));
  };

  const renderPagination = () => {
    const pages = [];
    const startPage = Math.max(1, page - 1);
    const endPage = Math.min(totalPages, startPage + 3); 
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`${i === page ? 'active' : ''} paginationButton`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h2>Dog Breeds</h2>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Breed Name</th>
              <th>Height (Metric)</th>
              <th>Breed Group</th>
              <th>Life Span</th>
              <th>Temperament</th>
              <th>Origin</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="note">
          Please Note:
          <br />
          The reports are for general information and reference purposes only.
          Please refer to the MIS reports shared over email for the final payout
          details. For any queries <a href="#">contact us</a>.
        </div>
        <div className="pagination">
          <button className="paginationButton" onClick={handlePreviousPage} disabled={page === 1}>
            &laquo;
          </button>
          {renderPagination()}
          <button className="paginationButton" onClick={handleNextPage} disabled={page === totalPages}>
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default DogTable;
