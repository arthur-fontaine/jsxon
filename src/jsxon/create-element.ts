import type { AnyJSXonComponent } from "../types/any-jsxon-component";
import type { JSXonNode } from "../types/jsxon-node";

export const createElement = <TYPE extends AnyJSXonComponent>(
	type: TYPE,
	props: Parameters<TYPE>[0],
	...children: Parameters<TYPE>[1][]
): JSXonNode<AnyJSXonComponent["__component"]> =>
	// @ts-expect-error
	type({ ...props, children }, ...children);
