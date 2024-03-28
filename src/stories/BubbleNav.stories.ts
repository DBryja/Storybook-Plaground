import type { Meta, StoryObj } from '@storybook/react';
import BubbleNav from '../app/components/BubbleNav';

const menuItems = [
    {name: "Item1"},
    {name: "LongItem2"},
    {name: "Item3"},
    {name: "Super Long Item3", href: "/super-long-item3"},
]
const active = 2;

const meta = {
    title: 'Minimalist/Nav',
    component: BubbleNav,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // backgroundColor: { control: 'color' },
        active: { control: {
            type: 'number',
            min: 0, max: menuItems.length, step: 1
            }},
    },
} satisfies Meta<typeof BubbleNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        menuItems,
        active,
    },
};