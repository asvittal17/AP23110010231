"use client";
import React from 'react'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export type FilterValue = '' | 'Event' | 'Result' | 'Placement'

type Props = {
  value: FilterValue
  onChange: (v: FilterValue) => void
}

const FilterBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
        <InputLabel id="filter-label">Filter by Type</InputLabel>
        <Select
          labelId="filter-label"
          label="Filter by Type"
          value={value}
          onChange={(e) => onChange(e.target.value as FilterValue)}
        >
          <MenuItem value=""><em>All</em></MenuItem>
          <MenuItem value="Event">Event</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default FilterBar
