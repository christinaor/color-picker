import { useState } from "react";
import axios from "axios";
import rgbJoin from "../../utils/rgbJoin";
import PaletteAdderInput from "../palette-adder-input";
import DisplayedColor from "../displayed-color";

import s from "./styles.module.css";

const PaletteAdder = ({ palettes, setPalettes }) => {
  const [colors, setColors] = useState(
    Array.from({ length: 5 }, (_, i) => i + 1).reduce((acc, key) => {
      acc[key] = { 
        r: 0, 
        g: 0, 
        b: 0 
      };
      return acc;
    }, {})
  );
  const [title, setTitle] = useState("");

  const addPalette = async () => {
    if (!title) return;

    const { status, data } = await axios.post("/api/palettes", {
      colors: colors,
      title: title,
    });

    if (status === 200) {
      setPalettes([...palettes, data]);
      setColors(Array.from({ length: 5 }, (_, i) => i + 1).reduce((acc, key) => {
        acc[key] = { 
          r: 0, 
          g: 0, 
          b: 0 
        };
        return acc;
      }, {}));
      setTitle("");
    };
  };

  return (
    <div className={s.paletteAdderContainer}>
      <h1 className={s.title}>Add a palette</h1>
      <div className={s.form}>
        <input
          className={s.input}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Enter a title"
        />
        <div className={s.paletteAdderInputs}>
          {[1, 2, 3, 4, 5].map(i => (
            <div className={s.paletteAdderInput}>
              <p className={s.colorNum}>{i}</p>
              <DisplayedColor color={rgbJoin(colors[i].r, colors[i].g, colors[i].b)} />
              <PaletteAdderInput key={`palette-adder-input-${i}`} i={i} colors={colors} setColors={setColors} />
            </div>
          ))}
        </div>
        <button 
          className={s.button} 
          onClick={addPalette} 
          disabled={!title}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default PaletteAdder;
