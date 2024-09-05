import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { GlobalStyles } from "@mui/material";

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
    }}
  />
);

const LogoComponent = () => {
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
          margin: 2,
        }}
      >
        {"Calendar".split("").map((letter, index) => (
          <Typography
            key={index}
            sx={{
              display: "inline-block",
              fontWeight: "bold",
              fontSize: 50,
              animation: isLoaded
                ? `wave 1.5s ease-in-out ${index * 0.1}s forwards`
                : "none",
              color: letter === "r" ? "#7091E6" : "inherit",
              textShadow:
                letter === "r" && isLoaded
                  ? "0 0 20px #7091E6, 0 0 15px #7091E6, 0 0 30px #7091E6"
                  : "none",
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
