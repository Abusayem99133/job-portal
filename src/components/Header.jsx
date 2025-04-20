import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
    }
  };
  return (
    <>
      <nav className="py-4 flex justify-between items-center text-center ">
        <Link>
          <img src="/src/assets/images/logo.png" alt="" className="h-20" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button onClick={() => setShowSignIn(true)} variant="outline">
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <Link to={"/job-post"}>
              {/* add a condition here */}
              <Button variant="destructive" className="rounded-full">
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
