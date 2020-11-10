import {validate} from "class-validator";

export type IValidationErrorsByModel = IValidationError[];

export interface IValidationErrorsByModels {
    [id: string]: IValidationErrorsByModel;
}

export interface IValidationError {
    target?: Model;
    property: string;
    value?: any;
    constraints: {
        [type: string]: string;
    };
    children: IValidationError[];
    contexts?: {
        [type: string]: any;
    };
}

export class Model {
    protected attributes: string[] = [];

    public load(value: any): Model {
        this.attributes.forEach(attribute => {
            if(value[attribute]){
                this[attribute] = value[attribute];
            }
        });
        return this;
    }

    public validate(): Promise<IValidationError[] | undefined> {
        // @ts-ignore
        return validate(this);
    }
}
