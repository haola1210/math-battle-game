import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import { Cube } from '.';
import { CommonCanvas } from '../CommonCanvas';

const Component: ComponentMeta<typeof Cube> = {
  title: 'Example/Cube',
  component: Cube,
  argTypes: {
    color: { control: 'color' },
    size: { control: false },
    position: { control: false },
  },
};
export default Component;

const Template: ComponentStory<typeof Cube> = (args) => (
  <CommonCanvas cameraPosition={[0, 0, 3]}>
    <Cube {...args} />
  </CommonCanvas>
);

export const Primary = Template.bind({});

Primary.storyName = 'Common Cube';
Primary.args = {
  color: 'lightgreen',
  initialRotate: true,
};
