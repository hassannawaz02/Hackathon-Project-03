import { Rule } from "@sanity/types";

const contactFormSchema = {
  name: "contactForm",
  title: "Contact Form",
  type: "document",
  fields: [
    {
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Name is required"),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().email().error("A valid email address is required"),
    },
    {
      name: "shippingAddress",
      title: "Shipping Address",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Shipping Address is required"),
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    },
  ],
};

export default contactFormSchema;
