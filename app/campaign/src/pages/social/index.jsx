import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RedirectSocial from "@/components/redirectSocial";
import { redirectLocalStorageOnce, delay } from "@/pages/social/conf";

export default function ({ authCallback }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    authCallback()
      .then(async (d) => {
        console.log(d);
        if (d.code === 4004) {
          setStatus("occupied");
        } else if (d.code === 500) {
          setStatus("failed");
        } else {
          setStatus("sucess");
        }
      })
      .catch(async (e) => {
        setStatus("failed");
      })
      .finally(async () => {
        await delay(3000);
        redirectLocalStorageOnce(navigate);
      });
  }, []);

  return (
    <div className="w-page-content px-2 lg:px-0 mx-auto">
      <RedirectSocial status={status} desc={errorMessage} />
    </div>
  );
}
