const Link = ({ label, href, className }) => {
  return (
    <a
      href={href}
      className={`px-4 py-2 bg-neutral-600 hover:bg-neutral-500 rounded-md transition  ${className}`}
    >
      {label}
    </a>
  );
};

Link.defaultProps = {
  href: '#',
};

export default Link;