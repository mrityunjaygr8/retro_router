import { Link } from "@tanstack/react-router";
import { Button } from "./retroui/Button";
import { Text } from "./retroui/Text";
import { useState } from "react";

const Links = () => {
  return (
    <>
      <Link to="/">
        <Text as="h6">Home</Text>
      </Link>
      <Link to="/">
        <Text as="h6">About</Text>
      </Link>
      <Link to="/">
        <Text as="h6">Home</Text>
      </Link>
      <Link to="/">
        <Text as="h6">About</Text>
      </Link>
    </>
  );
};
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu state.
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 mb-4">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Text as="h1">PARHAM</Text>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Links />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="outline" onClick={toggleMenu}>
              Menu
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (conditionally rendered) */}
      {/* The `md:hidden` class ensures this menu is only for mobile */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} text-center`}>
        <div className="px-2 pt-2 pb-3 space-y-4 sm:px-3 ">
          <Links />
        </div>
      </div>
    </nav>
  );
};

export default Header;
