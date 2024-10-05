import s from "./styles.module.css";

const PaletteAdderInput = ({ i, colors, setColors }) => {
  const handleChange = (ev, value, setValue) => {
    if (Number.isNaN(Number(ev.target.value)) 
      || String(ev.target.value).length > 3
    ) {
      return;
    };

    if (ev.target.value < 0) {
      setValue({
        ...colors, 
        [i]: {
          ...colors[i],
          [value]: 0,
        }
      });
    } else if (ev.target.value > 255) {
      setValue({
        ...colors, 
        [i]: {
          ...colors[i],
          [value]: 255,
        }
      });
    } else {
      setValue({
        ...colors, 
        [i]: {
          ...colors[i],
          [value]: ev.target.value,
        }
      });
    };
  };

  return (
    <div className={s.paletteAdderInputContainer}>
      <div className={s.fields}>
        <input
          className={s.input}
          value={colors[i].r}
          min={0}
          max={255}
          onChange={(ev) => handleChange(ev, "r", setColors)}
          placeholder="Enter R value"
        />
        <input
          className={s.input}
          value={colors[i].g}
          min={0}
          max={255}
          onChange={(ev) => handleChange(ev, "g", setColors)}
          placeholder="Enter G value"
        />
        <input
          className={s.input}
          value={colors[i].b}
          min={0}
          max={255}
          onChange={(ev) => handleChange(ev, "b", setColors)}
          placeholder="Enter B value"
        />
      </div>
    </div>
  );
};

export default PaletteAdderInput;
