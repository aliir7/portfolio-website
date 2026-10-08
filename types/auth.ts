export type LoginState = {
  error?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

export type PasswordResetState = {
  error?: string;
  success?: string;
  fieldErrors?: {
    email?: string[];
  };
};

export type ResetPasswordState = {
  error?: string;
  fieldErrors?: {
    password?: string[];
    confirmPassword?: string[];
  };
};
