import { useState } from "react";
import axios from "axios";

import s from "./styles.module.css";

const Filter = ({ setPalettes }) => {
  const [filter, setFilter] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  const fetchFilteredPalettes = async () => {
    if (!filter) return;

    const { status, data } = await axios.post("/api/filter", {
      filter: String(filter),
    });

    if (status === 200) {
      setPalettes(data);
      setFilter("");
      setIsFiltered(true);
    } else {
      throw new Error("Error connecting to server");
    };
  };

  const fetchAllPalettes = async () => {
    const fetchPalettes = async () => {
      const { status, data } = await axios.get("/api/palettes");
      if (status === 200) {
        setPalettes(data);
        setFilter("");
        setIsFiltered(false);
      } else {
        throw new Error("Error connecting to server");
      };
    };

    fetchPalettes();
  };

  return (
    <div className={s.filterContainer}>
      <h1 className={s.filterTitle}>Filter Palettes</h1>
      <div className={s.filterSection}>
        <input
          className={s.input}
          value={filter}
          onChange={(ev) => setFilter(ev.target.value)}
          placeholder="Search palette titles"
        />
        <div className={s.filterButtons}>
          <button className={s.button} onClick={fetchFilteredPalettes} disabled={!filter}>
            Find palettes
          </button>
          <button className={s.button} onClick={fetchAllPalettes} disabled={!isFiltered}>
            Clear filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
