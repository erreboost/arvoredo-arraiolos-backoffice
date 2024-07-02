'use client';
import React, {useEffect, useState} from 'react';

import DataTable from './data-table';
import {fetchTrees} from '@/app/api/arvores/fetchTrees';

export const ListArvores = () => {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrees();
        setTrees(data?.trees || []);
      } catch (error) {
        console.error('Error fetching trees:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <DataTable trees={trees} />
    </div>
  );
};

export default ListArvores;
