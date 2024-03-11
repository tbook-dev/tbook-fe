import { useEffect } from "react";
import { useState } from "react";

export default function RandomError() {
  const [v, setV] = useState(0);
  useEffect(() => {
    const randomValue = Math.random();
    if (Math.random() > 0.5) {
      throw new Error("random value > 0.5");
    } else {
      setV(randomValue);
    }
  }, []);

  return (
    <div className="pt-10 text-white flex flex-col items-center justify-center gap-y-4">
      <button
        className="text-white bg-linear7 p-2 rounded-lg"
        onClick={() => window.location.reload()}
      >
        reload to access error page
      </button>
      <p>current random value: {v}</p>
      <p>random value bigger than 0.5 willl trigger an error</p>
    </div>
  );
}
