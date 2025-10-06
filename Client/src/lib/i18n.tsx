"use client"

import React, { useState, useContext, createContext, type ReactNode } from "react"

export const languages = {
  en: "English",
  ar: "العربية",
} as const

export type Language = keyof typeof languages

export const translations = {
  en: {
    // Auth Common
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "Phone Number",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",

    // Login Page
    loginTitle: "Welcome Back",
    loginSubtitle: "Sign in to your account to continue",
    loginButton: "Sign In",
    noAccount: "Don't have an account?",
    signUpLink: "Sign up here",

    // Signup Page
    signupTitle: "Create Account",
    signupSubtitle: "Join our luxury rental platform",
    signupButton: "Create Account",
    haveAccount: "Already have an account?",
    signInLink: "Sign in here",
    agreeToTerms: "I agree to the",
    termsAndConditions: "Terms and Conditions",
    and: "and",
    privacyPolicy: "Privacy Policy",

    // Social Login
    continueWithGoogle: "Continue with Google",
    continueWithFacebook: "Continue with Facebook",
    orContinueWith: "Or continue with email",

    // Validation
    emailRequired: "Email is required",
    passwordRequired: "Password is required",
    passwordMinLength: "Password must be at least 8 characters",
    passwordsDoNotMatch: "Passwords do not match",
    firstNameRequired: "First name is required",
    lastNameRequired: "Last name is required",
    phoneRequired: "Phone number is required",
    termsRequired: "You must agree to the terms and conditions",

    // Owner Auth
    ownerLoginTitle: "Owner Portal",
    ownerLoginSubtitle: "Access your property management dashboard",
    ownerSignupTitle: "Become a Host",
    ownerSignupSubtitle: "Start earning with your properties",
    businessName: "Business Name",
    businessNameRequired: "Business name is required",
    businessType: "Business Type",
    individual: "Individual",
    company: "Company",
    propertyCount: "Number of Properties",
    propertyCountRequired: "Property count is required",

    // Dashboard Navigation
    dashboard: "Dashboard",
    myProperties: "My Properties",
    bookings: "Bookings",
    analytics: "Analytics",
    earnings: "Earnings",
    profile: "Profile",
    settings: "Settings",
    addProperty: "Add Property",

    // Property Management
    propertyType: "Property Type",
    room: "Room",
    car: "Car",
    propertyTitle: "Property Title",
    description: "Description",
    price: "Price",
    location: "Location",
    amenities: "Amenities",
    photos: "Photos",
    availability: "Availability",

    // Payment Settings
    paymentMethods: "Payment Methods",
    managePaymentMethods: "Manage your payment methods and payout preferences",
    addPaymentMethod: "Add Payment Method",
    creditCard: "Credit Card",
    bankAccount: "Bank Account",
    default: "Default",
    setDefault: "Set as Default",
    paymentType: "Payment Type",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    cardHolderName: "Cardholder Name",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    iban: "IBAN",
    cancel: "Cancel",
    payoutSettings: "Payout Settings",
    configurePayoutPreferences: "Configure how and when you receive payments",
    payoutFrequency: "Payout Frequency",
    minimumPayout: "Minimum Payout Amount",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    securePayouts: "Secure Payouts",
    securePayoutsDescription:
      "All payouts are processed securely through our banking partners with full encryption and fraud protection.",

    // Account Security
    accountSecurity: "Account Security",
    manageSecuritySettings: "Manage your account security and verification status",
    emailVerified: "Email Verified",
    phoneVerified: "Phone Verified",
    identityVerified: "Identity Verified",
    emiratesIdVerified: "Emirates ID verified",
    businessLicense: "Business License",
    businessLicenseVerified: "Business license verified",
    verified: "Verified",
    pending: "Pending",
    changePassword: "Change Password",
    updatePasswordDescription: "Update your password to keep your account secure",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    updatePassword: "Update Password",
    twoFactorAuthentication: "Two-Factor Authentication",
    twoFactorDescription: "Add an extra layer of security to your account",
    enableTwoFactor: "Enable Two-Factor Authentication",
    twoFactorSmsDescription: "Receive SMS codes for additional security",
    twoFactorEnabled: "Two-Factor Authentication Enabled",
    twoFactorEnabledDescription: "Your account is protected with SMS verification codes",
    loginNotifications: "Login Notifications",
    loginNotificationsDescription: "Get notified when someone signs into your account",
    emailNotifications: "Email Notifications",
    emailNotificationsDescription: "Receive email alerts for new login attempts",
    smsNotifications: "SMS Notifications",
    smsNotificationsDescription: "Receive SMS alerts for suspicious login activity",

    // Admin Auth
    adminLoginTitle: "Admin Portal",
    adminLoginSubtitle: "Super admin access to platform management",
    adminDashboard: "Admin Dashboard",
    systemOverview: "System Overview",

    // Admin Navigation
    userManagement: "User Management",
    propertyManagement: "Property Management",
    systemAnalytics: "System Analytics",
    systemSettings: "System Settings",
    contentManagement: "Content Management",
    reports: "Reports",
    auditLogs: "Audit Logs",

    // User Management
    allUsers: "All Users",
    activeUsers: "Active Users",
    suspendedUsers: "Suspended Users",
    userDetails: "User Details",
    suspendUser: "Suspend User",
    activateUser: "Activate User",
    deleteUser: "Delete User",
    userRole: "User Role",
    lastLogin: "Last Login",
    registrationDate: "Registration Date",
    verificationStatus: "Verification Status",

    // Property Management
    allProperties: "All Properties",
    pendingApproval: "Pending Approval",
    approvedProperties: "Approved Properties",
    rejectedProperties: "Rejected Properties",
    approveProperty: "Approve Property",
    rejectProperty: "Reject Property",
    propertyStatus: "Property Status",
    ownerInfo: "Owner Information",

    // System Analytics
    totalUsers: "Total Users",
    totalProperties: "Total Properties",
    totalBookings: "Total Bookings",
    totalRevenue: "Total Revenue",
    monthlyGrowth: "Monthly Growth",
    userGrowth: "User Growth",
    propertyGrowth: "Property Growth",
    revenueGrowth: "Revenue Growth",

    // System Settings
    platformSettings: "Platform Settings",
    emailSettings: "Email Settings",
    paymentSettings: "Payment Settings",
    securitySettings: "Security Settings",
    maintenanceMode: "Maintenance Mode",
    backupSettings: "Backup Settings",

    // Admin Actions
    approve: "Approve",
    reject: "Reject",
    suspend: "Suspend",
    activate: "Activate",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    export: "Export",
    import: "Import",
    backup: "Backup",
    restore: "Restore",
  },
  ar: {
    // Auth Common
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    phoneNumber: "رقم الهاتف",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",

    // Login Page
    loginTitle: "مرحباً بعودتك",
    loginSubtitle: "سجل دخولك إلى حسابك للمتابعة",
    loginButton: "تسجيل الدخول",
    noAccount: "ليس لديك حساب؟",
    signUpLink: "سجل هنا",

    // Signup Page
    signupTitle: "إنشاء حساب",
    signupSubtitle: "انضم إلى منصة الإيجار الفاخرة",
    signupButton: "إنشاء حساب",
    haveAccount: "لديك حساب بالفعل؟",
    signInLink: "سجل دخولك هنا",
    agreeToTerms: "أوافق على",
    termsAndConditions: "الشروط والأحكام",
    and: "و",
    privacyPolicy: "سياسة الخصوصية",

    // Social Login
    continueWithGoogle: "المتابعة مع جوجل",
    continueWithFacebook: "المتابعة مع فيسبوك",
    orContinueWith: "أو تابع بالبريد الإلكتروني",

    // Validation
    emailRequired: "البريد الإلكتروني مطلوب",
    passwordRequired: "كلمة المرور مطلوبة",
    passwordMinLength: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
    passwordsDoNotMatch: "كلمات المرور غير متطابقة",
    firstNameRequired: "الاسم الأول مطلوب",
    lastNameRequired: "اسم العائلة مطلوب",
    phoneRequired: "رقم الهاتف مطلوب",
    termsRequired: "يجب الموافقة على الشروط والأحكام",

    // Owner Auth
    ownerLoginTitle: "بوابة المالك",
    ownerLoginSubtitle: "الوصول إلى لوحة إدارة الممتلكات",
    ownerSignupTitle: "كن مضيفاً",
    ownerSignupSubtitle: "ابدأ في الكسب من ممتلكاتك",
    businessName: "اسم النشاط التجاري",
    businessNameRequired: "اسم النشاط التجاري مطلوب",
    businessType: "نوع النشاط",
    individual: "فردي",
    company: "شركة",
    propertyCount: "عدد الممتلكات",
    propertyCountRequired: "عدد الممتلكات مطلوب",

    // Dashboard Navigation
    dashboard: "لوحة التحكم",
    myProperties: "ممتلكاتي",
    bookings: "الحجوزات",
    analytics: "التحليلات",
    earnings: "الأرباح",
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    addProperty: "إضافة عقار",

    // Property Management
    propertyType: "نوع العقار",
    room: "غرفة",
    car: "سيارة",
    propertyTitle: "عنوان العقار",
    description: "الوصف",
    price: "السعر",
    location: "الموقع",
    amenities: "المرافق",
    photos: "الصور",
    availability: "التوفر",

    // Payment Settings
    paymentMethods: "طرق الدفع",
    managePaymentMethods: "إدارة طرق الدفع وتفضيلات الاستلام",
    addPaymentMethod: "إضافة طريقة دفع",
    creditCard: "بطاقة ائتمان",
    bankAccount: "حساب مصرفي",
    default: "افتراضي",
    setDefault: "تعيين كافتراضي",
    paymentType: "نوع الدفع",
    cardNumber: "رقم البطاقة",
    expiryDate: "تاريخ الانتهاء",
    cvv: "رمز الأمان",
    cardHolderName: "اسم حامل البطاقة",
    bankName: "اسم البنك",
    accountNumber: "رقم الحساب",
    iban: "رقم الآيبان",
    cancel: "إلغاء",
    payoutSettings: "إعدادات الاستلام",
    configurePayoutPreferences: "تكوين كيفية ووقت استلام المدفوعات",
    payoutFrequency: "تكرار الاستلام",
    minimumPayout: "الحد الأدنى للاستلام",
    daily: "يومي",
    weekly: "أسبوعي",
    monthly: "شهري",
    securePayouts: "مدفوعات آمنة",
    securePayoutsDescription:
      "جميع المدفوعات تتم معالجتها بأمان من خلال شركائنا المصرفيين مع التشفير الكامل وحماية من الاحتيال.",

    // Account Security
    accountSecurity: "أمان الحساب",
    manageSecuritySettings: "إدارة إعدادات الأمان وحالة التحقق",
    emailVerified: "البريد الإلكتروني محقق",
    phoneVerified: "الهاتف محقق",
    identityVerified: "الهوية محققة",
    emiratesIdVerified: "الهوية الإماراتية محققة",
    businessLicense: "رخصة تجارية",
    businessLicenseVerified: "الرخصة التجارية محققة",
    verified: "محقق",
    pending: "قيد المراجعة",
    changePassword: "تغيير كلمة المرور",
    updatePasswordDescription: "حدث كلمة المرور للحفاظ على أمان حسابك",
    currentPassword: "كلمة المرور الحالية",
    newPassword: "كلمة المرور الجديدة",
    confirmNewPassword: "تأكيد كلمة المرور الجديدة",
    updatePassword: "تحديث كلمة المرور",
    twoFactorAuthentication: "المصادقة الثنائية",
    twoFactorDescription: "أضف طبقة حماية إضافية لحسابك",
    enableTwoFactor: "تفعيل المصادقة الثنائية",
    twoFactorSmsDescription: "استقبل رموز SMS للحماية الإضافية",
    twoFactorEnabled: "المصادقة الثنائية مفعلة",
    twoFactorEnabledDescription: "حسابك محمي برموز التحقق عبر SMS",
    loginNotifications: "إشعارات تسجيل الدخول",
    loginNotificationsDescription: "احصل على إشعارات عند تسجيل شخص ما الدخول إلى حسابك",
    emailNotifications: "إشعارات البريد الإلكتروني",
    emailNotificationsDescription: "استقبل تنبيهات بريد إلكتروني لمحاولات تسجيل الدخول الجديدة",
    smsNotifications: "إشعارات SMS",
    smsNotificationsDescription: "استقبل تنبيهات SMS لنشاط تسجيل الدخول المشبوه",

    // Admin Auth
    adminLoginTitle: "بوابة الإدارة",
    adminLoginSubtitle: "وصول المدير العام لإدارة المنصة",
    adminDashboard: "لوحة تحكم الإدارة",
    systemOverview: "نظرة عامة على النظام",

    // Admin Navigation
    userManagement: "إدارة المستخدمين",
    propertyManagement: "إدارة العقارات",
    systemAnalytics: "تحليلات النظام",
    systemSettings: "إعدادات النظام",
    contentManagement: "إدارة المحتوى",
    reports: "التقارير",
    auditLogs: "سجلات المراجعة",

    // User Management
    allUsers: "جميع المستخدمين",
    activeUsers: "المستخدمون النشطون",
    suspendedUsers: "المستخدمون المعلقون",
    userDetails: "تفاصيل المستخدم",
    suspendUser: "تعليق المستخدم",
    activateUser: "تفعيل المستخدم",
    deleteUser: "حذف المستخدم",
    userRole: "دور المستخدم",
    lastLogin: "آخر تسجيل دخول",
    registrationDate: "تاريخ التسجيل",
    verificationStatus: "حالة التحقق",

    // Property Management
    allProperties: "جميع العقارات",
    pendingApproval: "في انتظار الموافقة",
    approvedProperties: "العقارات المعتمدة",
    rejectedProperties: "العقارات المرفوضة",
    approveProperty: "اعتماد العقار",
    rejectProperty: "رفض العقار",
    propertyStatus: "حالة العقار",
    ownerInfo: "معلومات المالك",

    // System Analytics
    totalUsers: "إجمالي المستخدمين",
    totalProperties: "إجمالي العقارات",
    totalBookings: "إجمالي الحجوزات",
    totalRevenue: "إجمالي الإيرادات",
    monthlyGrowth: "النمو الشهري",
    userGrowth: "نمو المستخدمين",
    propertyGrowth: "نمو العقارات",
    revenueGrowth: "نمو الإيرادات",

    // System Settings
    platformSettings: "إعدادات المنصة",
    emailSettings: "إعدادات البريد الإلكتروني",
    paymentSettings: "إعدادات الدفع",
    securitySettings: "إعدادات الأمان",
    maintenanceMode: "وضع الصيانة",
    backupSettings: "إعدادات النسخ الاحتياطي",

    // Admin Actions
    approve: "اعتماد",
    reject: "رفض",
    suspend: "تعليق",
    activate: "تفعيل",
    delete: "حذف",
    edit: "تعديل",
    view: "عرض",
    export: "تصدير",
    import: "استيراد",
    backup: "نسخ احتياطي",
    restore: "استعادة",
  },
}

const LanguageContext = createContext<{
  language: Language
  setLanguage: (lang: Language) => void
} | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  const [language, setLanguage] = useState<Language>("en")

  // Use context if available, otherwise fallback to local state
  const currentLanguage = context?.language || language
  const updateLanguage = context?.setLanguage || setLanguage

  return {
    language: currentLanguage,
    setLanguage: updateLanguage,
    t: (key: keyof typeof translations.en) => translations[currentLanguage][key] || key,
    isRTL: currentLanguage === "ar",
  }
}

export function useTranslation(lang: Language) {
  return translations[lang]
}
