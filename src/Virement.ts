import Client from "./Client";
import OperationBanquaire from "./OperationBanquaire";

export default class Virement extends OperationBanquaire {

    private _date: number;
    public get date(): number {
        return this._date;
    }
    public set date(value: number) {
        this._date = value;
    }

    private _clientDestinataireVirement: Client;
    public get clientDestinataireVirement(): Client {
        return this._clientDestinataireVirement;
    }
    public set clientDestinataireVirement(value: Client) {
        this._clientDestinataireVirement = value;
    }
    private _dateExecution: Date;
    public get dateExecution(): Date {
        return this._dateExecution;
    }
    public set dateExecution(value: Date) {
        this._dateExecution = value;
    }

    constructor(client: Client, montant: number, clientDestinataireVirement?: Client, dateExecution?: Date) {
        super(client, montant);

        this.date = Date.now();

        //si le destinataire est renseigné
        if (clientDestinataireVirement !== undefined)
            this.clientDestinataireVirement = clientDestinataireVirement;
        else
            //sinon le destinataire est client lui-même : virement de compte à compte
            //TODO: gérer la possibilité pour un client de disposer de plusieurs comptes
            this.clientDestinataireVirement = this.client;

        if (dateExecution !== undefined)
            this.dateExecution = dateExecution;
    }

    execute(): boolean {
        if (this.client.solde_compte >= this.montant) {
            this.client.solde_compte -= this.montant;
            this.clientDestinataireVirement.solde_compte += this.montant;
            return true;
        } else {
            return false;
        }
    }
}