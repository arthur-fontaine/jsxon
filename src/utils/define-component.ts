import type { JSXonNode } from "../types/jsxon-node";

export const defineComponent = <
	SIGNATURE extends string,
	COMPONENT extends (
		props: PROPS,
		...children: JSXonNode<CHILDREN_TYPE>[]
	) => JSXonNode<PP_SIGNATURE>,
	PROPS = Omit<Parameters<COMPONENT>[0], "children">,
	CHILDREN_TYPE extends string = Parameters<COMPONENT>[1] extends JSXonNode<
		infer TYPE
	>
		? TYPE
		: never,
	PP_SIGNATURE extends `jsxon:${SIGNATURE}` = `jsxon:${SIGNATURE}`,
>(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	name: PROPS extends { children: any }
		? "PROPS should not have children property"
		: SIGNATURE,
	component: COMPONENT,
) => {
	const c = (props: PROPS, ...children: JSXonNode<CHILDREN_TYPE>[]) => {
		return component(props ?? ({} as PROPS), ...children) as ReturnType<COMPONENT>;
	};
	c.__component = `jsxon:${name}` as const;
	return c;
};
