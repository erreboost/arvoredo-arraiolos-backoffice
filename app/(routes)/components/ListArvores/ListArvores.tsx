'use client';
import React, {useEffect, useState} from 'react';
import {fetchTrees} from '@/app/api/arvores/route';
import DataTable from './data-table';

export const ListArvores = () => {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrees();
        setTrees(data?.trees || []); // Assuming 'trees' is the array in your response
      } catch (error) {
        console.error('Error fetching trees:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>List of Trees</h2>
      <DataTable trees={trees} /> {/* Pass fetched 'trees' data to DataTable */}
    </div>
  );
};

export default ListArvores;
