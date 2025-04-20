import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Header = () => {
  return (
    <>
      <nav className="py-4 flex justify-between items-center text-center ">
        <Link>
          <img src="/src/assets/images/logo.png" alt="" className="h-20" />
        </Link>
        <Button variant="outline">Login</Button>

        <div>
          {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
        </div>
      </nav>
    </>
  );
};

export default Header;
