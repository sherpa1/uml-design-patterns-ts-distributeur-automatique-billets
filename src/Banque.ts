import AbstractBanque from "./AbstractBanque";
import OperationBanquaire from "./OperationBanquaire";

export default class Banque extends AbstractBanque {

    private _operations: Array<OperationBanquaire> = [];
    public get operations(): Array<OperationBanquaire> {
        return this._operations;
    }
    public set operations(value: Array<OperationBanquaire>) {
        this._operations = value;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    constructor(name: string) {
        super();
        this.name = name;
    }

    execute(operationBanquaire: OperationBanquaire): boolean {
        this.operations.push(operationBanquaire);
        return operationBanquaire.execute();
    }
}