import type { Meta, StoryObj } from '@storybook/react';
import EnterText from '../app/components/EnterText';


const meta = {
    title: 'FramerMotion/EnterText',
    component: EnterText,
    parameters: {layout: "centered"},
    argTypes: {},
} satisfies Meta<typeof EnterText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "Default",
    args: {},
};