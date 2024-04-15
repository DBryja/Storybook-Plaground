import type { Meta, StoryObj } from '@storybook/react';
import ScaleAndParallax from '../app/components/ScaleAndParallax';


const meta = {
    title: 'GSAP/ScaleAndParallax',
    component: ScaleAndParallax,
    parameters: {layout: "padded"},
    argTypes: {},
} satisfies Meta<typeof ScaleAndParallax>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "Default",
    args: {},
};