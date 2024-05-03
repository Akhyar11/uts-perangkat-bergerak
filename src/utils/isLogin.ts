import Cookies from "js-cookie";

const cekLogin = () => {
  const cookieToken = Cookies.get("userId");
  if (cookieToken) return cookieToken;
  else return false;
};

export default cekLogin;
