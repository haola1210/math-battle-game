interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

const Button = ({ children, ...rest }: IButtonProps) => {
  return (
    <button
      style={{ background: '#9a8c98', color: 'white' }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
