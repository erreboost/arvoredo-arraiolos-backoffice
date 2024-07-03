import React from 'react';

interface FilterProps {
  columns: {id: string; header: string}[];
  setFilter: (columnId: string, value: string) => void;
}

const Filter: React.FC<FilterProps> = ({columns, setFilter}) => {
  const [selectedColumn, setSelectedColumn] = React.useState<string>(
    columns[0].id
  );
  const [searchValue, setSearchValue] = React.useState<string>('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setFilter(selectedColumn, value);
  };

  const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedColumn(selectedId);
    setFilter(selectedId, searchValue);
  };

  return (
    <div className="flex gap-2">
      <select
        value={selectedColumn}
        onChange={handleColumnChange}
        className="border rounded p-2"
      >
        {columns.map((column) => (
          <option key={column.id} value={column.id}>
            {column.header}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={searchValue}
        onChange={handleFilterChange}
        placeholder={`Filtrar por ${
          columns.find((col) => col.id === selectedColumn)?.header
        }`}
        className="border rounded p-2"
      />
    </div>
  );
};

export default Filter;
