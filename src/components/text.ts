import * as utils from "../utils/$utils";

interface TextProps {
	text: string;
}

export const Text = utils.defineComponent("Text", (props: TextProps) => ({
	type: "jsxon:Text",
	props,
}));
