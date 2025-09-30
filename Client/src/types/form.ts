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
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface OwnerSignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  businessType: "individual" | "company";
  propertyCount: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface AdminLoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}
