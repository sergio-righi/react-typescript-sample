import { ExampleService, IExampleService } from "./example";

export interface IProvidedService {
  example: IExampleService;
}

export const initializeService = (): IProvidedService => ({
  example: new ExampleService(),
})