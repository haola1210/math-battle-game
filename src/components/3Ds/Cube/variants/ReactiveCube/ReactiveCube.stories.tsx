import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import ReactiveCube from './ReactiveCube';
import { CommonCanvas } from './../../../CommonCanvas';

const Component: ComponentMeta<typeof ReactiveCube> = {
  title: 'Example/Cube',
  component: ReactiveCube,
  argTypes: {
    color: { control: 'color' },
    size: { control: false },
    position: { control: false },
  },
};
export default Component;

const ReactiveTemplate: ComponentStory<typeof ReactiveCube> = (args) => (
  <CommonCanvas cameraPosition={[0, 0, 3]}>
    <ReactiveCube {...args} />
  </CommonCanvas>
);

export const ReactivePrimary = ReactiveTemplate.bind({});

ReactivePrimary.storyName = 'Reactive Cube';
ReactivePrimary.args = {
  color: 'lightpink',
  hoveringColor: 'orange',
  initialRotate: true,
};
