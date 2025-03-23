import { SortKey, useSorting } from "@/contexts/SortingContext";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box, Button, ButtonGroup } from "@mui/material";
import React from "react";
import styles from "../styles/Sorting.module.scss";

const Sorting = () => {
  const { sortBy, sortOrder, onSortChange } = useSorting();

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      // если кликнули на ту же кнопку, то переключаем порядок сортировки
      const newOrder = sortOrder === "asc" ? "desc" : "asc";
      onSortChange(key, newOrder);
    } else {
      // если кликнули на другую кнопку, то по дефолту сортируем по возрастанию
      onSortChange(key, "asc");
    }
  };

  return (
    <Box className={styles.sortingBox}>
      <ButtonGroup variant="outlined" aria-label="sorting options">
        <Button
          className={styles.sortingButton}
          sx={{ fontSize: "10px" }}
          onClick={() => handleSort("name")}
          startIcon={
            sortBy === "name" && (sortOrder === "asc" ? <ArrowUpward className={styles.arrowUp} /> : <ArrowDownward />)
          }
        >
          По названию
        </Button>

        <Button
          sx={{ fontSize: "10px" }}
          onClick={() => handleSort("price")}
          startIcon={sortBy === "price" && (sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />)}
        >
          По цене
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Sorting;
