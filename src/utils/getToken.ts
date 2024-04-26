import Cookies from "js-cookie";

const cekToken = () => {
  const cookieToken = Cookies.get("token");
  if (cookieToken) return cookieToken;
  else return false;
};

export default cekToken;
