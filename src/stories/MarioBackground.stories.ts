import type {Meta, StoryObj} from "@storybook/react";
import MarioBackground from "../app/components/MarioBackground";

const meta = {
    title: "Backgrounds/MarioBackground",
    component: MarioBackground,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof MarioBackground>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {},
}