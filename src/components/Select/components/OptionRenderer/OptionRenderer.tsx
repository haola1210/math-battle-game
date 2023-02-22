import { type OptionRendererProps } from '../../types';
import './OptionRenderer.scss';

const OptionRenderer = ({ option }: OptionRendererProps): JSX.Element => {
  if (option.render !== undefined) {
    return option.render() as JSX.Element;
  }

  if (option.html !== undefined) {
    return <div dangerouslySetInnerHTML={{ __html: option.html }}></div>;
  }

  return <div className='truncate'>{option.name}</div>;
};

export default OptionRenderer;
