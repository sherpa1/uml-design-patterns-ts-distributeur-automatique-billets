import Client from "./Client";

//Design Pattern Strategy
export default interface StrategyDepot {
    execute(montant: number, client: Client): boolean;
}
