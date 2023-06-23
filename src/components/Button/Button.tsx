import './style.scss';

interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

const Button = ({ children, className, ...rest }: IButtonProps) => {
  return (
    <button
      className={`${className} btn`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
