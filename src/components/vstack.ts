import * as utils from "../utils/$utils";
import type { StackProps } from "./types/stack-props";

interface VStackProps extends StackProps {}

export const VStack = utils.defineComponent(
	"VStack",
	(props: VStackProps, ...children) => ({
		type: "jsxon:VStack",
		props,
		children,
	}),
);
