export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  service: string;
}

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: "male" | "female" | "other";
  age: string;
  city: string;
  emirate: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface OwnerSignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: "male" | "female" | "other";
  age: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  businessPincode: string;
  businessType: "individual" | "company";
  experienceYears: string;
  bio: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface AdminLoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}
