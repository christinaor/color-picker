import { useEffect, useState } from "react";
import axios from "axios";
import rgbJoin from "../../utils/rgbJoin";
import DisplayedColor from "../displayed-color";

import s from "./styles.module.css";


const PaletteColor = ({ i, palette, palettes, setPalettes }) => {
  const initialColor = rgbJoin(palette.palette[i].r, palette.palette[i].g, palette.palette[i].b);
  const [color, setColor] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);
  const [newR, setNewR] = useState(palette.palette[i].r);
  const [newG, setNewG] = useState(palette.palette[i].b);
  const [newB, setNewB] = useState(palette.palette[i].r);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const editedColor = rgbJoin(newR, newG, newB)
    if (editedColor !== newColor) {
      setNewColor(editedColor)
    }
  }, [newR, newG, newB])

  const updatePalette = async (r, g, b) => {
    if (palette.palette[i].r === r
      && palette.palette[i].g === g
      && palette.palette[i].b === b
    ) {
      setIsEditing(false);
      return;
    };
    
    const newPalette = { ...palette.palette,
      [i]: { r: newR, g: newG, b: newB },
    };

    const { status, data } = await axios.put("/api/palettes", {
      id: palette.id,
      palette: newPalette,
    });

    if (status === 200) {
      const updatedPalettes = palettes.map((paletteDetails) => (
        paletteDetails.id === data.id ? data : paletteDetails
      ));
      setPalettes(updatedPalettes);
      setColor(rgbJoin(data.palette[i].r, data.palette[i].g, data.palette[i].b));
      setNewColor(rgbJoin(data.palette[i].r, data.palette[i].g, data.palette[i].b))
      setIsEditing(false);
    };
  };

  const handleChange = (ev, setValue) => {
    if (Number.isNaN(Number(ev.target.value)) 
      || String(ev.target.value).length > 3
    ) {
      return;
    };

    if (ev.target.value < 0) {
      setValue(0);
    } else if (ev.target.value > 255) {
      setValue(255);
    } else {
      setValue(ev.target.value);
    };
  };

  if (!palette) return null;

  return (
    <div className={s.paletteColorContainer}>
      <div className={s.paletteColor}>
        <div className={s.colorDetails}>
          {!isEditing ? (
            <DisplayedColor color={newColor} />
          ) : (
            <DisplayedColor color={color} />
          )}
          {!isEditing ? (
            <div key={`color-values-${i}`} className={s.color}>
              <p className={s.value}>{palette.palette[i].r}</p>
              <p className={s.value}>{palette.palette[i].g}</p>
              <p className={s.value}>{palette.palette[i].b}</p>
            </div>
          ) : (
            <div className={s.fields}>
              <input
                className={s.input}
                value={newR}
                min={0}
                max={255}
                onChange={(ev) => handleChange(ev, setNewR)}
                placeholder="Enter a new R value"
              />
              <input
                className={s.input}
                value={newG}
                min={0}
                max={255}
                onChange={(ev) => handleChange(ev, setNewG)}
                placeholder="Enter a new G value"
              />
              <input
                className={s.input}
                value={newB}
                min={0}
                max={255}
                onChange={(ev) => handleChange(ev, setNewB)}
                placeholder="Enter a new B value"
              />
            </div>
          )}
        </div>
        <div className={s.buttons}>
          {!isEditing ? (
            <button className={s.button} onClick={() => setIsEditing(true)}>
              Edit color
            </button>
          ) : (
            <div className={s.editButtons}>
              <button className={s.button} onClick={() => setIsEditing(false)} disabled={!isEditing}>
                Cancel
              </button>
              <button className={s.button} onClick={() => updatePalette(newR, newG, newB)} disabled={!isEditing}>
                Update color
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaletteColor;
