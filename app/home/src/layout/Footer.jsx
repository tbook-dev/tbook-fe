import logo from "@tbook/share/images/icon/logo.svg";
import tel from "@/images/icon/tel.svg";
import twitter from "@/images/icon/twitter.svg";
import { NavLink, Link } from "react-router-dom";

const telLink = `https://t.me/Peter_TBook`;
const twitterLink = `https://twitter.com/realtbook?s=21&t=ccMMXb68Jav5nnocUz9JLw`;

const list = [
  {
    text: "Contact Us",
    href: telLink,
  },
  // {
  //   text: "Terms of Use",
  //   href: "",
  // },
  // {
  //   text: "Privacy Policy",
  //   href: "",
  // },
  // {
  //   text: "Career",
  //   href: "",
  // },
];

export default function Footer() {
  return (
    <footer className="bg-[rgb(25,25,25)] divide-y divide-c-6">
      <div className="flex flex-col bx lg:flex-row lg:justify-between pt-10 lg:pt-[70px] lg:px-16">
        <div className="flex flex-col justify-between mb-8">
          <div className="flex flex-col items-center lg:items-start w-[70vw] mx-auto lg:w-[373px] lg:mb-14">
            <img src={logo} className="w-8 mb-4" />
            <p className="text-white text-c9">
              Explore more effective and equitable incentive protocols to accelerate the web3 world.
            </p>
          </div>

          <div className="mb-[60px] hidden lg:block">
            <h3 className="font-bold text-white text-c9 mb-[30px]">Contact us</h3>
            <div className="flex items-center">
              <a className="w-[40px]" href={telLink} target="_blank">
                <img src={tel} />
              </a>
              <a className="ml-8 w-[46px]" href={twitterLink} target="_blank">
                <img src={twitter} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mb-20 space-y-4">
          <Link to="/" className="flex items-center px-8 font-bold text-white bold text-c1">
            Tbook
          </Link>
          {list.map((link) => {
            if (link.href) {
              if (link.href.startsWith("http")) {
                return (
                  <a
                    href={link.href}
                    key={link.text}
                    target="_blank"
                    className="flex items-center px-8 font-bold text-c1"
                  >
                    <span className="text-c-6 hover:text-white">{link.text}</span>
                  </a>
                );
              } else {
                <NavLink to={link.href} key={link.text} className="flex items-center px-8 font-bold text-c1 text-c-6">
                  {({ isActive }) => {
                    return <span className={clsx(isActive && "font-bold text-white")}> {link.text}</span>;
                  }}
                </NavLink>;
              }
            } else {
              return (
                <span key={link.text} className="flex items-center px-8 font-bold text-c1 text-c-6">
                  {link.text}
                </span>
              );
            }
          })}
        </div>
      </div>
      <div>
        <div className="px-16 py-8 bx">
          <div className="flex justify-center mb-3 lg:hidden">
            <a href={telLink} target="_blank" className="mr-4 w-9">
              <img src={tel} />
            </a>
            <a href={twitterLink} target="_blank" className="w-10">
              <img src={twitter} />
            </a>
          </div>

          <p className="text-c4 text-c-6">© 2023 TBOOK All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
