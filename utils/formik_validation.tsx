import * as Yup from "yup";

export const CreateProfileValidataion = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Input your first name."),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Input your first name."),
  aboutMe: Yup.string()
    .min(2, "Too Short!")
    .max(1000, "Too Long!")
    .required("Please input about you!"),
  profession: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please input your profession!"),
  country: Yup.string().required("Select Country!"),
  city: Yup.string().required("Select City!"),
});

export const CreateGigValidation = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Title is required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(1000, "Too Long!")
    .required("Description is required!"),
  category: Yup.string().required("Required"),
  subcategories: Yup.string().required("Required"),
  paymentMethod: Yup.string().required("Required"),
  price: Yup.number().min(5, "Too low").required("Input Price"),
});

export const EditProfileValidation = Yup.object().shape({});

export const CreateServiceValidateSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(255, "Too Long!")
    .required("Title is required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(5000, "Too Long!")
    .required("Description is required!"),
  category: Yup.string().required("Required"),
  subcategories: Yup.string().required("Required"),
  jobtype: Yup.string().required("Required"),
  joblevel: Yup.string().required("Required"),
  paymentMethod: Yup.string().required("Required"),
  price: Yup.number().min(5, "Too low").required("Input Price"),
});

export const CreateProposalValidation = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Title is required"),
  coverletter: Yup.string()
    .min(2, "Too Short!")
    .max(5000, "Too Long!")
    .required("Description is required!"),
  price: Yup.number().min(5, "Too low").required("Input Price"),
  paymentMethod: Yup.string().required("Required"),
});
