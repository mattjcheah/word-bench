import React, { useState, useEffect, useContext, createContext } from "react";

const smallScreenMatchMedia = () => window.matchMedia("(min-width: 768px)");

const MediaContext = createContext();

const MediaProvider = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    !smallScreenMatchMedia().matches
  );

  useEffect(() => {
    const listener = (matchMedia) => setIsSmallScreen(!matchMedia.matches);
    const matchMedia = smallScreenMatchMedia();
    matchMedia.addListener(listener);

    return () => matchMedia.removeListener(listener);
  }, []);

  return (
    <MediaContext.Provider value={isSmallScreen}>
      {children}
    </MediaContext.Provider>
  );
};

const useMedia = () => {
  return useContext(MediaContext);
};

export { MediaProvider };
export default useMedia;
