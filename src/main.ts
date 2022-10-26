//TODO: pour une meilleure lisibilité, il faudrait répartir les classes et interfaces dans des fichiers distincts

abstract class AbstractBanque {
    abstract execute(operationBanquaire: OperationBanquaire): boolean;
}

class Banque extends AbstractBanque {

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

enum TypeDepot {
    ESPECE = "ESPECE",
    CHEQUE = "CHEQUE",
}

class Client {
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
        const op = new Virement(this, montant, "externe", destinataire);
        return this.banque.execute(op);
    }
}

abstract class OperationBanquaire {
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

//Design Pattern Strategy
interface StrategyDepot {
    execute(montant: number, client: Client): boolean;
}

//Design Pattern Strategy : algorithme spécifique (dépôt chèque) de résolution d'une opération générique : dépôt
class DepotCheque implements StrategyDepot {
    execute(): boolean {
        //TODO: implémenter logique métier
        //contacter la banque d'origine et vérifier que la somme est disponible
        return true;
    }
}

//Design Pattern Strategy : algorithme spécifique (dépôt espèce) de résolution d'une opération générique : dépôt
class DepotEspece implements StrategyDepot {
    execute(): boolean {
        //TODO: implémenter logique métier
        //dépôt espece --> solde_compter la somme et comparer avec la somme déclarée
        return true;
    }
}

//Design Pattern Strategy : algorithme spécifique (dépôt dollars) de résolution d'une opération générique : dépôt
class DepotDollars implements StrategyDepot {
    execute(): boolean {
        //TODO: implémenter logique métier
        //dépôt espece --> solde_compter la somme et comparer avec la somme déclarée
        return true;
    }
}

class Depot extends OperationBanquaire {

    private _strategy: StrategyDepot;
    public get strategy(): StrategyDepot {
        return this._strategy;
    }
    public set strategy(value: StrategyDepot) {
        this._strategy = value;
    }

    //surcharge du constructeur d'origine
    constructor(client: Client, montant: number, strategy: StrategyDepot) {
        super(client, montant);//passage des paramètres au constructeur d'origine
        this.strategy = strategy;
    }

    execute(): boolean {
        //résolution de l'opération déléguée à une stratégie fournie
        //via une injection de dépendance dans le constructeur
        return this.strategy.execute(this.montant, this.client);
    }
}

class Retrait extends OperationBanquaire {
    execute(): boolean {
        if (this.client.solde_compte >= this.montant) {
            this.client.solde_compte -= this.montant;
            return true;
        } else {
            return false;
        }
    }
}

class Virement extends OperationBanquaire {

    typeeffectuer_Virement: string;
    date: Date;
    clientDestinataireVirement: Client;
    dateExecution: Date;

    constructor(client: Client, montant: number, typeeffectuer_Virement: string, clientDestinataireVirement?: Client, dateExecution?: Date) {
        super(client, montant);

        //si le destinataire est renseigné
        if (clientDestinataireVirement !== undefined)
            this.clientDestinataireVirement = clientDestinataireVirement;
        else
            //sinon le destinataire est client lui-même : virement de compte à compte
            //TODO: gérer la possibilité pour un client de disposer de plusieurs comptes
            this.clientDestinataireVirement = this.client;

        this.typeeffectuer_Virement = typeeffectuer_Virement;

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

class Emprunt extends OperationBanquaire {

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

function main() {
    const azerty_bank = new Banque("Banque AZERTY");
    const qwerty_bank = new Banque("Banque QWERTY");

    const client_1 = new Client(azerty_bank);
    client_1.firstname = "John";
    client_1.lastname = "Doe";
    client_1.solde_compte = 1000;

    const client_2 = new Client(qwerty_bank);
    client_2.solde_compte = 200;
    client_2.firstname = "James";
    client_2.lastname = "White";

    console.log(`${client_1.fullname()} dispose de ${client_1.solde_compte}€`);
    console.log(`${client_2.fullname()} dispose de ${client_2.solde_compte}€`);

    const montant = 100;

    try {
        const result: boolean = client_1.effectuer_virement(client_2, montant);

        if (result) {
            console.log(`le virement de ${montant}€ du client ${client_1.fullname()} vers le client ${client_2.fullname()} a été effectué`);
            console.log(`${client_1.fullname()} dispose de ${client_1.solde_compte}€`);
            console.log(`${client_2.fullname()} dispose de ${client_2.solde_compte}€`);
        }
    } catch (error) {
        console.error(error);
    }

}

main();