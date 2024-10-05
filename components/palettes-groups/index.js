import axios from "axios";
import PaletteGroup from "../palette-group";

import s from "./styles.module.css";

const PaletteGroups = ({ palettes, setPalettes }) => {
  const deletePalette = async (id) => {
    const { status, data } = await axios.delete("/api/palettes", {
      data: { id },
    });

    if (status === 200) {
      setPalettes(palettes.filter((palette) => palette.id !== data));
    } else {
      throw new Error("Error connecting to server");
    };
  };

  if (!palettes) return null;

  return (
    <div className={s.paletteGroupsContainer}>
      <h1 className={s.title}>Current Palettes</h1>
      {palettes?.length > 0 ? (
        <ul className={s.palettes}>
          {palettes.map((palette,i) => (
            <li key={`palette-${i}`} className={s.palette}>
              <PaletteGroup palettes={palettes} setPalettes={setPalettes} palette={palette} i={i} deletePalette={deletePalette} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No palettes exist!</p>
      )}
    </div>
  );
};

export default PaletteGroups;
