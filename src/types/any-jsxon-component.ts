import * as components from "../components/$components";

export type AnyJSXonComponent = (typeof components)[keyof typeof components];
