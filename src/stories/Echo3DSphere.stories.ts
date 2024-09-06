import type { Meta, StoryObj } from '@storybook/react';
import Echo3DSphere from "../components/Echo3dSphere";
import { MeshPhysicalMaterialProps } from '@react-three/fiber';

const meta: Meta<typeof Echo3DSphere> = {
    title: 'ThreeJS/Echo3DSphere',
    component: Echo3DSphere,
    parameters: { layout: 'centered' },
    argTypes: {
        color: { control: 'color' },
        metalness: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
        roughness: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
        emissive: { control: 'color' },
        emissiveIntensity: { control: { type: 'range', min: 0, max: 10, step: 0.1 } },
        clearcoat: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
        clearcoatRoughness: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
        transmission: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: 'Default',
    args: {
        color: '#FF4820',
        metalness: 1,
        roughness: 0.5,
        emissive: '#FF4820',
        emissiveIntensity: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transmission: 0.3,
    },
};
