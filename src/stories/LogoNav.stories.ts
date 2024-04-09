import type { Meta, StoryObj } from '@storybook/react';
import LogoNav from '../app/components/LogoNav';


const meta = {
    title: 'Minimalist/LogoNav',
    component: LogoNav,
    parameters: {layout: "padded"},
    argTypes: {},
} satisfies Meta<typeof LogoNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "Default",
    args: {},
};