import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="py-4 flex justify-between items-center text-center ">
        <Link>
          <img src="/src/assets/images/logo.png" alt="" className="h-20" />
        </Link>
      </nav>
    </>
  );
};

export default Header;
