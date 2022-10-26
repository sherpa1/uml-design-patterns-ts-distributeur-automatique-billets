export default class Emprunt extends OperationBanquaire {

    private _dureeRemboursement: number = 12;
    public get dureeRemboursement(): number {
        return this._dureeRemboursement;
    }
    public set dureeRemboursement(value: number) {
        this._dureeRemboursement = value;
    }

    constructor(client: Client, montant: number, dureeRemboursement: number) {
        super(client, montant);
        this.dureeRemboursement = dureeRemboursement;
    }

    execute(): boolean {
        //TODO: implémenter logique métier
        return true;
    }
}