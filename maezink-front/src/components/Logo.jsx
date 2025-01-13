const Logo = ({adapter}) => {
  return (
    <div className={adapter}>
      <img 
        src="/logomaezink.png" 
        alt="Logo"
        loading="lazy"
      />
    </div>
  );
};

export default Logo;