import { AnyJSXonComponent } from "../types/any-jsxon-component";
import { JSXonNode } from "../types/jsxon-node";

export const createElement = <TYPE extends AnyJSXonComponent>(
	type: TYPE,
	...typeParams: Parameters<TYPE>
): JSXonNode<AnyJSXonComponent["__component"]> =>
	// @ts-expect-error
	type(...typeParams);
