import PaletteColor from "../palette-color";

import s from "./styles.module.css";

const PaletteGroup = ({ palettes, setPalettes, palette, i, deletePalette }) => {
  if (!palette) return null;

  return (
    <div className={s.paletteGroupContainer}>
      <p className={s.title}>{palette.title}</p>
      <div className={s.paletteSection}>
        <ul className={s.colors}>
          {Object.keys(palette.palette).map((colorNum) => (
            <PaletteColor key={`palette-${i}-color-${colorNum}`} i={colorNum} palette={palette} palettes={palettes} setPalettes={setPalettes} />
          ))}
        </ul>
        
        <button className={s.button} onClick={() => deletePalette(palette.id)}>
          Delete palette
        </button>
      </div>
    </div>
  );
};

export default PaletteGroup;
