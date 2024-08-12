import { test, describe, expect } from "vitest";
import createJiti from "jiti";
import * as babel from "@babel/core";
import transformPlugin from "@babel/plugin-transform-react-jsx";

const jiti = createJiti(import.meta.url);

describe("jsxon runtime", () => {
	test("should return a json object describing the element", () => {
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
		const executedCode =
			transformedCode &&
			jiti.evalModule(transformedCode, {
				ext: ".ts",
				id: import.meta.url,
				filename: import.meta.url,
			});

		expect(executedCode).toHaveProperty("element");
		expect((executedCode as any).element).toMatchSnapshot();
	});
});
