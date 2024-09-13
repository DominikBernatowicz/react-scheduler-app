import { Box, Typography, GlobalStyles } from "@mui/material";
import { FC, useEffect, useState } from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";

// Define your animations
const globalStyles = (
  <GlobalStyles
    styles={{
      "@keyframes wave": {
        "0%": {
          transform: "translateY(0)",
          opacity: 0,
        },
        "50%": {
          transform: "translateY(-10px)",
          opacity: 0.8,
        },
        "100%": {
          transform: "translateY(0px)",
          opacity: 1,
        },
      },
      ".logo-wave": {
        animation: "wave 5s ease-in-out forwards",
        display: "inline-block",
        opacity: 0,
      },
      ".logo-wave .delay-0": {
        animationDelay: "1s",
      },
      ".logo-wave .delay-1": {
        animationDelay: "1.1s",
      },
      ".logo-wave .delay-2": {
        animationDelay: "1.2s",
      },
      ".logo-wave .delay-3": {
        animationDelay: "1.3s",
      },
      ".logo-wave .delay-4": {
        animationDelay: "1.4s",
      },
      ".logo-wave .delay-5": {
        animationDelay: "1.5s",
      },
      ".logo-wave .delay-6": {
        animationDelay: "1.6s",
      },
      ".logo-wave .delay-7": {
        animationDelay: "1.7s",
      },
      ".logo-wave .delay-8": {
        animationDelay: "1.8s",
      },
      "@keyframes textShadow": {
        "0%": {
          textShadow: "none",
        },
        "50%": {
          textShadow: "0 0 30px #7091E6, 0 0 25px #7091E6, 0 0 40px #7091E6",
        },
        "100%": {
          textShadow: "0 0 10px #7091E6, 0 0 7px #7091E6, 0 0 15px #7091E6",
        },
      },
    }}
  />
);

const LogoComponent: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {globalStyles}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          margin: 2,
        }}
      >
        <div
          style={{
            transform: isLoaded ? "none" : "translateX(-2rem)",
            transition: "all 1000ms ease-in-out",
            opacity: isLoaded ? 1 : 0,
            marginRight: "1rem",
          }}
        >
          <DateRangeIcon color="primary" fontSize="large" />
        </div>
        {"Calendar".split("").map((letter, index) => (
          <Typography
            key={index}
            sx={{
              display: "inline-block",
              fontWeight: "bold",
              fontSize: 50,
              animation: isLoaded
                ? letter === "C"
                  ? "wave 1.5s ease-in-out 0s forwards, textShadow 1.5s ease-in-out 1.5s forwards"
                  : `wave 1.5s ease-in-out ${index * 0.1}s forwards`
                : "none",
              color: letter === "C" ? "#1976d2" : "inherit",
            }}
          >
            {letter}
          </Typography>
        ))}
      </Box>
    </>
  );
};

export default LogoComponent;
