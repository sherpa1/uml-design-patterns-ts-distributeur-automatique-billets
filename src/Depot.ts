import Client from "./Client";
import OperationBanquaire from "./OperationBanquaire";
import StrategyDepot from "./StrategyDepot";

export default class Depot extends OperationBanquaire {

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