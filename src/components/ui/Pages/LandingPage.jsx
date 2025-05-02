import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../button";
import { Carousel, CarouselContent, CarouselItem } from "../carousel";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import companies from "../../../data/companies.json";
import faqs from "../../../data/faqs.json";
import Autoplay from "embla-carousel-autoplay";
import logo from "../../../../public/images/logo.png";
import banner from "../../../../public/images/companies/banner.jpeg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-16 md:gap-20 py-10 sm:py-14 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-16 xl:px-32">
      {/* HERO SECTION */}
      <section className="text-center">
        <h1 className="gradient-title text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight">
          Find Your Dream Job{" "}
          <span className="flex items-center justify-center gap-2 sm:gap-4 mt-2 sm:mt-4">
            and get{" "}
            <img
              className="h-10 sm:h-14 lg:h-20 xl:h-24"
              src={logo}
              alt="Hirrd Logo"
            />
          </span>
        </h1>
        <p className="text-gray-400 mt-4 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link to="/jobs-listing">
          <Button size="xl" variant="blue" className="w-52">
            Find Jobs
          </Button>
        </Link>
        <Link to="/jobs-post">
          <Button size="xl" variant="destructive" className="w-52">
            Post Jobs
          </Button>
        </Link>
      </div>

      {/* COMPANIES CAROUSEL */}
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full py-8 sm:py-10"
      >
        <CarouselContent className="flex gap-6 sm:gap-10 items-center">
          {companies?.map(({ name, id, path }) => (
            <CarouselItem
              key={id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <img
                src={path}
                alt={name}
                className="h-10 sm:h-14 object-contain mx-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* BANNER IMAGE */}
      <div className="w-full overflow-hidden rounded-lg shadow-md">
        <img src={banner} alt="Banner" className="w-full h-auto object-cover" />
      </div>

      {/* JOB CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Search and apply for jobs, track applications, and more.</p>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Post jobs, manage applications, and find the best candidates.</p>
          </CardContent>
        </Card>
      </section>

      {/* FAQ ACCORDION */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="max-w-4xl mx-auto">
          {faqs?.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq?.question}</AccordionTrigger>
              <AccordionContent>{faq?.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
};

export default LandingPage;
