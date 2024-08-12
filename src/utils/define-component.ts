import { JSXonNode } from "../types/jsxon-node";

export const defineComponent = <
	SIGNATURE extends string,
	COMPONENT extends (
		props: any,
		...children: JSXonNode<CHILDREN_TYPE>[]
	) => JSXonNode<PP_SIGNATURE>,
	CHILDREN_TYPE extends string = string,
	PP_SIGNATURE extends `jsxon:${SIGNATURE}` = `jsxon:${SIGNATURE}`,
>(
	name: SIGNATURE,
	component: COMPONENT,
) => {
	Object.defineProperty(component, "__component", {
		value: name,
	});
	return component as COMPONENT & { __component: PP_SIGNATURE };
};
