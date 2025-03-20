import { useFilters } from "@/contexts/FiltersContext";
import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const PriceFilter = () => {
  const { filters, setPriceRange } = useFilters();
  const [localFrom, setLocalFrom] = useState<string>(filters.priceRange.from?.toString() || "");
  const [localTo, setLocalTo] = useState<string>(filters.priceRange.to?.toString() || "");

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalFrom(value);

    const numberValue = parseFloat(value);
    if (!isNaN(numberValue)) {
      setPriceRange({ from: numberValue, to: filters.priceRange.to });
    } else if (value === "") {
      setPriceRange({ from: undefined, to: filters.priceRange.to }); //Позволить пустой input
    }
  };

  const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalTo(value);

    const numberValue = parseFloat(value);
    if (!isNaN(numberValue)) {
      setPriceRange({ from: filters.priceRange.from, to: numberValue });
    } else if (value === "") {
      setPriceRange({ from: filters.priceRange.from, to: undefined }); //Позволить пустой input
    }
  };

  return (
    <Box sx={{ mb: 3, px: 3, display: "flex", flexDirection: "column" }}>
      <Typography sx={{ fontSize: "17px", fontWeight: "bold" }} gutterBottom>
        Цена, $
      </Typography>
      <Box sx={{ my: 2, width: "90%", flexDirection: "row", display: "flex", gap: 2 }}>
        <TextField label="From" type="number" value={localFrom} onChange={handleFromChange} />
        <TextField label="To" type="number" value={localTo} onChange={handleToChange} />
      </Box>
    </Box>
  );
};

export default PriceFilter;
