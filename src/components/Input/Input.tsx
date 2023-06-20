interface IInputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
}

const Input = ({ label, ...rest }: IInputProps) => {
  return (
    <div>
      {label && <div>{label}</div>}
      <input
        {...rest}
        style={{
          width: '100%',
          height: 30,
          background: '#9a8c98',
          borderRadius: 8,
          color: 'white',
        }}
      />
    </div>
  );
};

export default Input;
