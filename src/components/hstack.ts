import * as utils from "../utils/$utils";
import type { StackProps } from "./types/stack-props";

interface HStackProps extends StackProps {}

export const HStack = utils.defineComponent(
	"HStack",
	(props: HStackProps, ...children) => ({
		type: "jsxon:HStack",
		props,
		children,
	}),
);
