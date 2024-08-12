import { test, describe, expect } from "vitest";
import * as babel from "@babel/core";
import transformPlugin from "@babel/plugin-transform-react-jsx";

describe("basic babel transform", () => {
	test("should transform jsx", () => {
		const code = /* tsx */ `
      import JSXon, { Text } from '../src/index.ts'
      export const element = <Text text="Hello, JSXon!" />
    `;
		const result = babel.transformSync(code, {
			plugins: [
				[
					transformPlugin,
					{
						pragma: "JSXon.createElement",
						pragmaFrag: "JSXon.Fragment",
					},
				],
			],
		});

		const transformedCode = result?.code;
		expect(transformedCode).toMatchSnapshot();
	});
});
