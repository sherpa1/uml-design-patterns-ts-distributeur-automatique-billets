import Banque from "./Banque";
import Depot from "./Depot";
import DepotCheque from "./DepotCheque";
import DepotEspece from "./DepotEspece";
import { TypeDepot } from "./TypeDepot";
import Virement from "./Virement";
import OperationBanquaire from "./OperationBanquaire";

export default class Client {
    private _id: string;
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    private _firstname: string;
    public get firstname(): string {
        return this._firstname;
    }
    public set firstname(value: string) {
        this._firstname = value;
    }
    private _lastname: string;
    public get lastname(): string {
        return this._lastname;
    }
    public set lastname(value: string) {
        this._lastname = value;
    }
    private _solde_compte: number = 0;
    public get solde_compte(): number {
        return this._solde_compte;
    }
    public set solde_compte(value: number) {
        this._solde_compte = value;
    }
    //TODO: gérer la possibilité pour un client de disposer de plusieurs comptes
    private _banque: Banque;
    public get banque(): Banque {
        return this._banque;
    }
    public set banque(value: Banque) {
        this._banque = value;
    }
    //TODO: gérer la possibilité pour un client de disposer de plusieurs banques

    constructor(banque: Banque) {
        this.banque = banque;
    }

    fullname(): string {
        return this.firstname + " " + this.lastname;
    }

    deposer_argent(montant: number, type: string): boolean {

        let strategy;

        if (type === TypeDepot.CHEQUE) {
            strategy = new DepotCheque();
        } else if (type === TypeDepot.ESPECE) {
            strategy = new DepotEspece();
        } else {
            throw new Error(`Le type de dépôt ${type} n'est pas autorisé`);
        }

        const op = new Depot(this, montant, strategy);//injection de dépendance et emploi du Design Pattern Strategy
        return this.banque.execute(op);

    }

    effectuer_virement(destinataire: Client, montant: number): boolean {
        const op = new Virement(this, montant, destinataire);
        return this.banque.execute(op);
    }
}
