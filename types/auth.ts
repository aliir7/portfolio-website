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
};
