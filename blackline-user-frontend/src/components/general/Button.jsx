const Button = ({ label, onClick, className, type }) => {
  return (
    <button
      type={type || 'button'}
      className={`px-4 py-2 bg-neutral-600 hover:bg-neutral-500 rounded-md transition ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  onClick: () => {},
  className: '',
  type: 'button',
};

export default Button;