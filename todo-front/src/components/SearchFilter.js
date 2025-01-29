import React, { useState } from 'react';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filters, setFilters] = useState({
    priority: '',
    startDate: '',
    endDate: ''
  });

  const handleSearch = () => {
    onSearch(searchKeyword);
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <div className="mb-4">
      <div className="row g-3">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search todos..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <select
              className="form-select"
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            >
              <option value="">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
            <input
              type="date"
              className="form-control"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              placeholder="Start Date"
            />
            <input
              type="date"
              className="form-control"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              placeholder="End Date"
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleFilter}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;