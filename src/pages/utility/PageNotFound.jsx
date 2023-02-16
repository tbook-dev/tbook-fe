import React from "react";
import { Link } from "react-router-dom";

import NotFoundImage from "../../images/404-illustration.svg";

function PageNotFound() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
        <div className="max-w-2xl m-auto mt-16">
          <div className="px-4 text-center">
            <div className="inline-flex mb-8">
              <img
                src={NotFoundImage}
                width="176"
                height="176"
                alt="404 illustration"
              />
            </div>
            <div className="mb-6">
              Hmm...this page doesn’t exist. Try searching for something else!
            </div>
            <Link
              to="/"
              className="text-white bg-indigo-500 btn hover:bg-indigo-600"
            >
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
