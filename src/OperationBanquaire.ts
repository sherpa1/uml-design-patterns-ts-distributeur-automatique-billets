import Client from "./Client";

export default abstract class OperationBanquaire {
    private _id: string;
    protected get id(): string {
        return this._id;
    }
    protected set id(value: string) {
        this._id = value;
    }
    private _montant: number;
    protected get montant(): number {
        return this._montant;
    }
    protected set montant(value: number) {
        this._montant = value;
    }
    private _client: Client;
    protected get client(): Client {
        return this._client;
    }
    protected set client(value: Client) {
        this._client = value;
    }

    constructor(client: Client, montant: number) {
        this.client = client;
        this.montant = montant;
    }

    abstract execute(): boolean;
}