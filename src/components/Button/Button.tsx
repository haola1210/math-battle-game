import './style.scss';

interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

const Button = ({ children, ...rest }: IButtonProps) => {
  return (
    <div className='btn'>
      <button {...rest}>{children}</button>
    </div>
  );
};

export default Button;
