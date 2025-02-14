import { FunctionParameters } from 'openai/resources';

export interface IFunction {
  name: string;
  description: string;
  parameters: FunctionParameters;
  execute: (args: any, otherOptions: any) => any;
  strict?: boolean;
}
