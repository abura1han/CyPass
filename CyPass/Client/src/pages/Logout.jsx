import Cookies from "js-cookie";
import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    if (Cookies.get("access_token")) {
      Cookies.remove("access_token");
    }
    window.location = "/login";
  });
  return <div>Logging out.....</div>;
}

export default Logout;
