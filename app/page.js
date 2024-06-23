"use client";

import ContactForm from "@/app/components/ContactForm";
import GridPattern from "./components/GridPattern";

const ContactPage = () => {
  return (
    <>
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <GridPattern
          className="absolute inset-0 -z-10 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_50%,transparent_60%)]"
          yOffset={-256}
        />
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
