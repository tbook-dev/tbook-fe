// 表单页面的banner
import clsx from "clsx";

export default function ({ img, title, description, className }) {
  return (
    <header className={clsx("flex", className)}>
      <div className="lg:h-24 lg:w-24">
        <img src={img} className="hidden w-24 h-24 mx-auto lg:block" />
      </div>
      <div className="flex flex-col justify-center flex-auto">
        <h1 className="lg:mb-1 text-[28px] leading-[32px] lg:text-cwh3 lg:font-bold dark:text-white">
          {title}
        </h1>
        <h2 className="lg:text-cwh2 dark:text-b-8">{description}</h2>
      </div>
    </header>
  );
}
