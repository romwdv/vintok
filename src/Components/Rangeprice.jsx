import {
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFill,
} from "react-aria-components";
const Rangeprice = ({ rangePrice, setRangePrice }) => {
  return (
    <Slider
      style={{ width: "280px", maxWidth: "100%" }}
      value={rangePrice}
      minValue={0}
      maxValue={10000}
      step={1}
      onChange={(val) => setRangePrice(val)}
      aria-label="Slider filtre prix"
    >
      <SliderTrack
        style={{
          position: "relative",
          height: "28px",
          width: "100%",
        }}
      >
        {({ state }) => (
          <>
            {/* Bulles */}
            {state.values.map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${state.getThumbPercent(i) * 100}%`,
                  top: "-28px",
                  transform: "translateX(-50%)",
                  background: "#007782",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "2px 8px",
                  borderRadius: 6,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                {state.getThumbValue(i)} €
              </div>
            ))}

            {/* Track background */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                height: "4px",
                background: "#e0e0e0",
                transform: "translateY(-50%)",
                borderRadius: "2px",
              }}
            />

            {/* Track fill */}
            <SliderFill
              style={{
                background: "#007782",
                borderRadius: "2px",
                height: "4px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
              }}
            />

            {/* Pouces */}
            {state.values.map((_, i) => (
              <SliderThumb
                key={i}
                index={i}
                aria-label={i === 0 ? "Prix minimum" : "Prix maximum"}
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "#fff",
                  border: "3px solid #6f7575",
                  boxShadow: "0 0 0 2px rgba(255,255,255,0.9)",
                  cursor: "pointer",
                  zIndex: 3,
                }}
              />
            ))}
          </>
        )}
      </SliderTrack>
      <p
        style={{
          marginLeft: "25px",
          border: "1px solid lightgray",
          padding: "5px",
          cursor: "pointer",
        }}
        onClick={() => setRangePrice([0, 10000])}
      >
        reset
      </p>
    </Slider>
  );
};

export default Rangeprice;
