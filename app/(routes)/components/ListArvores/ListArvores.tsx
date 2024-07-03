'use client';
import React, {useEffect, useState} from 'react';

import DataTable from './data-table';
import {fetchTrees} from '@/app/api/arvores/fetchTrees';

import {LoadingSpinner} from '@/components/ui/loading-spinner';

export const ListArvores = () => {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrees();
        setTrees(data?.trees || []);
      } catch (error) {
        console.error('Error fetching trees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full overflow-x-auto">
          <DataTable trees={trees} />
        </div>
      )}
    </div>
  );
};

export default ListArvores;
