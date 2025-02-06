import { FunctionParameters } from 'openai/resources';

export interface IFunction {
  name: string;
  description: string;
  parameters: FunctionParameters;
  execute: (args: any) => any;
  strict?: boolean;
}
