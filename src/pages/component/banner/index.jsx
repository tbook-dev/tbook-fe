// 表单页面的banner
import clsx from "clsx";

export default function ({ img, title, description, className }) {
  return (
    <header className={clsx("flex", className)}>
      <div className="hidden lg:h-24 lg:block lg:w-24">
        <img src={img} className="w-24 h-24 mx-auto " />
      </div>
      <div className="flex flex-col justify-center flex-auto ml-12 lg:ml-0 lg:text-c">
        <h1 className="mb-1 font-bold text-c11 lg:text-cwh3 dark:text-white">
          {title}
        </h1>
        <h2 className="text-c2 lg:text-cwh2 dark:text-b-8">{description}</h2>
      </div>
    </header>
  );
}
