import { FormControlLabel, Switch, Box, Typography } from "@mui/material";
import { useFilters } from "@/contexts/FiltersContext";

const NewProductsFilter = () => {
  const {
    filters: { showNewOnly },
    setShowNewOnly,
  } = useFilters();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setShowNewOnly(checked);
  };

  return (
    <Box sx={{ mb: 3, px: 3 }}>
      <Typography sx={{ fontSize: "17px", fontWeight: "bold" }} gutterBottom>
        Новинки
      </Typography>
      <FormControlLabel control={<Switch checked={showNewOnly} onChange={handleToggle} />} label="Показать новинки" />
    </Box>
  );
};

export default NewProductsFilter;
