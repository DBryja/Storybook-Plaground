import type { Meta, StoryObj } from '@storybook/react';
import BubbleNav from '../app/components/BubbleNav';

const meta = {
    title: 'Minimalist/Nav',
    component: BubbleNav,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
} satisfies Meta<typeof BubbleNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};