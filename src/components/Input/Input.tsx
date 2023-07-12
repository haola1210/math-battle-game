import './style.scss';

interface IInputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  errorMessage?: string;
}

const Input = ({ label, errorMessage, ...rest }: IInputProps) => {
  return (
    <div>
      {label && <div>{label}</div>}
      <input {...rest} />
      <div className='error-message'>{errorMessage ?? ''}&nbsp;</div>
    </div>
  );
};

export default Input;
