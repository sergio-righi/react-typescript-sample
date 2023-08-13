import { ExampleData, IExampleData } from "data";
import { ApiResponse } from "types";

export interface IExampleService {
}

export class ExampleService implements IExampleService {
  exampleData: IExampleData;

  constructor() {
    this.exampleData = new ExampleData();
  }
}