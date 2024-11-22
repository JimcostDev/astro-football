import PropTypes from 'prop-types';

const Button = ({ children, href, bgColor, borderColor, ...rest }) => {
  const classNames = `
    text-sm inline-flex items-center justify-center gap-2 px-4 py-3
    text-tertiary bg-transparent border rounded-lg shadow-md 
    hover:shadow-xl ease-in-out duration-500 cursor-pointer mb-2 
    ${bgColor || ''} ${borderColor || ''}
  `;

  return href ? (
    <a href={href} className={classNames} {...rest}>
      {children}
    </a>
  ) : (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
};

Button.defaultProps = {
  href: null,
  bgColor: '',
  borderColor: '',
};

export default Button;
