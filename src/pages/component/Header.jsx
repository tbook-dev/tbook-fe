import React from "react";
import clsx from "clsx";

function Header({ iconUrl, title, className }) {
  return (
    <header className="mb-6">
      <img
        src={iconUrl}
        className={clsx("hidden w-24 h-24 mx-auto lg:block", className)}
      />

      <h1 className="mb-6 lg:mb-10 text-[28px] leading-[32px] text-center lg:text-[56px] lg:leading-[64px]">
        {title}
      </h1>
    </header>
  );
}

export default React.memo(Header);
