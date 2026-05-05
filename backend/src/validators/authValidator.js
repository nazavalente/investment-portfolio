export const validateRegister = (body) => {
  const errors = [];

  if (!body.name || !String(body.name).trim()) {
    errors.push("Nama wajib diisi");
  }

  if (!body.email || !String(body.email).trim()) {
    errors.push("Email wajib diisi");
  }

  if (!body.password || !String(body.password).trim()) {
    errors.push("Password wajib diisi");
  }

  if (body.password && String(body.password).length < 6) {
    errors.push("Password minimal 6 karakter");
  }

  return errors;
};

export const validateLogin = (body) => {
  const errors = [];

  if (!body.email || !String(body.email).trim()) {
    errors.push("Email wajib diisi");
  }

  if (!body.password || !String(body.password).trim()) {
    errors.push("Password wajib diisi");
  }

  return errors;
};