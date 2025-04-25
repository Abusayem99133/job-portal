import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // 🟢 useLocation import করো
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const location = useLocation(); // 🟢 current location object
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [location.search]); // 🟢 dependency এখন location.search

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
              <Button variant="destructive" className="rounded-full">
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/save-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
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
