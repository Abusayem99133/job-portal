import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../button";
import { Carousel, CarouselContent, CarouselItem } from "../carousel";
import { Card, CardContent } from "../card";
import companies from "../../../data/companies.json";
import Autoplay from "embla-carousel-autoplay";
const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job{" "}
          <span className="flex items-center gap-2 sm:gap-6">
            and get{" "}
            <img
              className="h-14 sm:h-20 lg:h-24"
              src="/src/assets/images/logo.png"
              alt="Hirrd Logo"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        <Link to={"/jobs-listing"}>
          <Button size="xl" variant="blue">
            Find Jobs
          </Button>
        </Link>
        <Link to={"/jobs-post"}>
          <Button variant="destructive" size="xl">
            Post Jobs
          </Button>
        </Link>
      </div>
      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies?.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      {/* banner */}
      <section>{/* cards */}</section>
      {/* Accordion */}
    </main>
  );
};

export default LandingPage;
