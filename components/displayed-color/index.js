import s from "./styles.module.css";

const DisplayedColor = ({ color }) => {

  return (
    <div className={`${s.rgbColorContainer}`} style={{ backgroundColor: color }}></div>
  );
};

export default DisplayedColor;
