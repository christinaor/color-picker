import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../components/filter";
import PaletteAdder from "../components/palette-adder";
import PaletteGroups from "../components/palettes-groups";

const Home = () => {

  const [palettes, setPalettes] = useState(null);
  useEffect(() => {
    if (!palettes) {
      const fetchPalettes = async () => {
        const { status, data } = await axios.get("/api/palettes");

        if (status === 200) {
          setPalettes(data);
        } else {
          throw new Error("Error connecting to server");
        }
      };

      fetchPalettes();
    };
  }, [setPalettes, axios]);

  return (
    <div>
      <PaletteAdder palettes={palettes} setPalettes={setPalettes} />
      <Filter setPalettes={setPalettes} />
      <PaletteGroups palettes={palettes} setPalettes={setPalettes} />
    </div>
  )
};

export default Home;
