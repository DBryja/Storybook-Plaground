import type { Meta, StoryObj } from '@storybook/react';
import Scene from '../components/Three/Glass/Scene';

const meta: Meta<typeof Scene> = {
    title: 'ThreeJS/GlassTorus',
    component: Scene,
    parameters: { layout: 'centered' },
    argTypes: {
        thickness: { control: { type: 'range', min: 0, max: 3, step: 0.05 } },
        roughness: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
        transmission: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
        ior: { control: { type: 'range', min: 0, max: 3, step: 0.1 } },
        chromaticAberration: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
        backside: { control: { type: 'boolean' } },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: 'Default',
    args: {
        thickness: 0.2,
        roughness: 0,
        transmission: 1,
        ior: 1.2,
        chromaticAberration: 0.02,
        backside: true,
    },
};