import React, { useState, useRef, useEffect } from "react";
import FadeIn from "./FadeIn";
import TextInput from "./TextInput";
import RadioInput from "./RadioInput";
import CheckboxInput from "./CheckboxInput";
import Button from "./Button";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioURL: "",
    managementExperience: "",
    additionalSkills: [],
    preferredInterviewTime: ""
  });

  const [errors, setErrors] = useState({});
  const [summary, setSummary] = useState(null);
  const summaryRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        additionalSkills: checked
          ? [...prevData.additionalSkills, value]
          : prevData.additionalSkills.filter((skill) => skill !== value)
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const validate = () => {
    let errors = {};
    if (!formData.fullName) {
      errors.fullName = "Full Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone Number must be a valid number";
    }
    if (formData.position === "Developer" || formData.position === "Designer") {
      if (!formData.relevantExperience) {
        errors.relevantExperience = "Relevant Experience is required";
      } else if (isNaN(formData.relevantExperience) || formData.relevantExperience <= 0) {
        errors.relevantExperience = "Relevant Experience must be a number greater than 0";
      }
    }
    if (formData.position === "Designer" && !formData.portfolioURL) {
      errors.portfolioURL = "Portfolio URL is required";
    } else if (formData.position === "Designer" && !/^https?:\/\/\S+$/.test(formData.portfolioURL)) {
      errors.portfolioURL = "Portfolio URL must be a valid URL";
    }
    if (formData.position === "Manager" && !formData.managementExperience) {
      errors.managementExperience = "Management Experience is required";
    }
    if (formData.additionalSkills.length === 0) {
      errors.additionalSkills = "At least one skill must be selected";
    }
    if (!formData.preferredInterviewTime) {
      errors.preferredInterviewTime = "Preferred Interview Time is required";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, set the summary
      setSummary(formData);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <FadeIn>
      {summary && (
        <div ref={summaryRef} className="mb-8 p-6 border rounded-md bg-white shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Form Summary</h2>
          <p><strong>Full Name:</strong> {summary.fullName}</p>
          <p><strong>Email:</strong> {summary.email}</p>
          <p><strong>Phone Number:</strong> {summary.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {summary.position}</p>
          {(summary.position === "Developer" || summary.position === "Designer") && (
            <p><strong>Relevant Experience:</strong> {summary.relevantExperience}</p>
          )}
          {summary.position === "Designer" && (
            <p><strong>Portfolio URL:</strong> {summary.portfolioURL}</p>
          )}
          {summary.position === "Manager" && (
            <p><strong>Management Experience:</strong> {summary.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {summary.additionalSkills.join(", ")}</p>
          <p><strong>Preferred Interview Time:</strong> {summary.preferredInterviewTime}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="isolate mt-2 -space-y-px rounded-2xl bg-white/50">
          <div className="border border-neutral-300 px-2 py-4 first:rounded-t-2xl last:rounded-b-2xl">
            <TextInput
              label="Full Name"
              name="fullName"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleInputChange}
              error={errors.fullName}
            />
            {errors.fullName && <p className="text-red-600">{errors.fullName}</p>}
          </div>
          <div className="border border-neutral-300 px-2 py-4 first:rounded-t-2xl last:rounded-b-2xl">
            <TextInput
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>
          <div className="border border-neutral-300 px-2 py-4 first:rounded-t-2xl last:rounded-b-2xl">
            <TextInput
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={errors.phoneNumber}
            />
            {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber}</p>}
          </div>
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <label className="text-base/6 text-neutral-500">Applying for Position</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 border border-neutral-300 rounded-md"
            >
              <option value="">Select a position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          {(formData.position === "Developer" || formData.position === "Designer") && (
            <div className="border border-neutral-300 px-2 py-4 first:rounded-t-2xl last:rounded-b-2xl">
              <TextInput
                label="Relevant Experience (Years)"
                name="relevantExperience"
                type="number"
                value={formData.relevantExperience}
                onChange={handleInputChange}
                error={errors.relevantExperience}
              />
              {errors.relevantExperience && <p className="text-red-600">{errors.relevantExperience}</p>}
            </div>
          )}
          {formData.position === "Designer" && (
            <div className="border border-neutral-300 px-2 py-4 first:rounded-t-2xl last:rounded-b-2xl">
              <TextInput
                label="Portfolio URL"
                name="portfolioURL"
                value={formData.portfolioURL}
                onChange={handleInputChange}
                error={errors.portfolioURL}
              />
              {errors.portfolioURL && <p className="text-red-600">{errors.portfolioURL}</p>}
            </div>
          )}
          {formData.position === "Manager" && (
            <div className="border border-neutral-300 px-2 py-4 first:rounded-t-2xl last:rounded-b-2xl">
              <TextInput
                label="Management Experience"
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleInputChange}
                error={errors.managementExperience}
              />
              {errors.managementExperience && <p className="text-red-600">{errors.managementExperience}</p>}
            </div>
          )}
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Additional Skills</legend>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {["JavaScript", "CSS", "Python", "React", "Node.js", "Mongo DB"].map((skill) => (
                  <CheckboxInput
                    key={skill}
                    label={skill}
                    name="additionalSkills"
                    value={skill}
                    checked={formData.additionalSkills.includes(skill)}
                    onChange={handleInputChange}
                  />
                ))}
              </div>
              {errors.additionalSkills && <p className="text-red-600">{errors.additionalSkills}</p>}
            </fieldset>
          </div>
          <div className="border border-neutral-300 px-2 py-4 first:rounded-t-2xl last:rounded-b-2xl">
            <label className="text-base/6 text-neutral-500">Preferred Interview Time</label>
            <input
              type="datetime-local"
              name="preferredInterviewTime"
              value={formData.preferredInterviewTime}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 border border-neutral-300 rounded-md"
            />
            {errors.preferredInterviewTime && <p className="text-red-600">{errors.preferredInterviewTime}</p>}
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="mt-2">
            SUBMIT NOW
          </Button>
        </div>
      </form>
    </FadeIn>
  );
};

export default ContactForm;
