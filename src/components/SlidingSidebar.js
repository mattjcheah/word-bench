import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { GiHamburgerMenu } from "react-icons/gi";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const SidebarContainer = styled(animated.div)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate3d(16rem, 0, 0);
`;

const HamburgerButton = styled(GiHamburgerMenu)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: var(--oxblood);
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const Sidebar = ({ isOpen, onClose, children }) => {
  const props = useSpring({
    transform: isOpen ? "translate3d(0, 0, 0)" : "translate3d(16rem, 0, 0)",
  });

  return (
    <>
      {isOpen && <Overlay onClick={onClose} />}
      <SidebarContainer style={props}>{children}</SidebarContainer>
    </>
  );
};

const SlidingSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <HamburgerButton onClick={() => setIsOpen(true)}>Sidebar</HamburgerButton>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Sidebar>
    </>
  );
};

export default SlidingSidebar;
