import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "@/api/incentive";
import RedirectSocial from "@/components/redirectSocial";

export default function () {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const data = new URLSearchParams();
    data.append("code", code);
    data.append("state", state);
    fetch(`${host}/twitter/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: data,
    })
      .then((r) => r.json())
      .then((d) => {
        console.log(d);
        if (d.code === 4004) {
          setStatus("occupied");
          setErrorMessage("");
        } else if (d.code === 500) {
          setStatus("failed");
        } else {
          setStatus("sucess");
          const redirect = localStorage.getItem("redirect_url");
          if (redirect != null) {
            localStorage.removeItem("redirect_url");
            location.href = redirect;
          } else {
            navigate("/");
          }
        }
        // if (d.code != 200) {
        //   setErrorMessage(d.message);
        //   return;
        // }
        // const redirect = localStorage.getItem("redirect_url");
        // if (redirect != null) {
        //   localStorage.removeItem("redirect_url");
        //   location.href = redirect;
        // } else {
        //   navigate("/");
        // }
      })
      .catch((e) => {
        setStatus("failed");
        const redirect = localStorage.getItem("redirect_url");
        localStorage.removeItem("redirect_url");
        location.href = redirect;
      });
  }, []);

  return (
    // <>
    //   <div>Redirecting...</div>
    //   {errorMessage && <div>{errorMessage}</div>}
    // </>
    <div>
      <RedirectSocial status={status} desc={errorMessage} />
    </div>
  );
}
