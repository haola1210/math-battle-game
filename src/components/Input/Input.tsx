import './style.scss';

interface IInputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
}

const Input = ({ label, ...rest }: IInputProps) => {
  return (
    <div>
      {label && <div>{label}</div>}
      <input {...rest} />
    </div>
  );
};

export default Input;
