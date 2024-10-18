export default function ({ children, link }) {
  return (
    <a
      href={link}
      target="_blank"
      className="hover:text-white bg-clip-text	text-transparent bg-gradient-to-l  from-[#904BF6] to-[#CF0063] relative hover:after:bg-white hover:after:bg-none  after:h-px after:absolute after:-bottom-1 after:inset-x-0 after:bg-gradient-to-r  after:from-[#904BF6] after:to-[#CF0063]"
    >
      {children}
    </a>
  );
}
