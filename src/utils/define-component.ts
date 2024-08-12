import type { JSXonNode } from "../types/jsxon-node";
import type { Prettify } from "../types/prettify";

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
	// NOTE: We need to duplicate the type definition here to type the returned function
	type CHILDREN_TYPE_ = Parameters<COMPONENT>[1] extends JSXonNode<infer TYPE>
		? TYPE
		: never;

	const c = (
		props: Prettify<
			PROPS &
				(CHILDREN_TYPE_ extends never
					? Record<never, never>
					: { children?: JSXonNode<CHILDREN_TYPE_>[] })
		>,
	) => {
		const { children, ...p } = props as PROPS & {
			children?: JSXonNode<CHILDREN_TYPE_>[];
		};
		return component(
			p as PROPS,
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			...(children ?? []) as any,
		) as ReturnType<COMPONENT>;
	};
	c.__component = `jsxon:${name}` as const;
	return c;
};
