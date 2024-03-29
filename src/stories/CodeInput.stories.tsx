import type { Meta, StoryObj } from '@storybook/react';
import CodeInput from '../app/components/CodeInput';


const meta = {
    title: "CodeInput",
    component: CodeInput,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof CodeInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Story: Story = {
    name: "Default",
    args: {
        buildList: [3, '-', 2, '=',1]
    }
};
