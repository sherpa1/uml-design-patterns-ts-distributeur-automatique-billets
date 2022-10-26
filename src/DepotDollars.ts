import StrategyDepot from "./StrategyDepot";

//Design Pattern Strategy : algorithme spécifique (dépôt dollars) de résolution d'une opération générique : dépôt
export default class DepotDollars implements StrategyDepot {
    execute(): boolean {
        //TODO: implémenter logique métier
        //dépôt espece --> solde_compter la somme et comparer avec la somme déclarée
        return true;
    }
}