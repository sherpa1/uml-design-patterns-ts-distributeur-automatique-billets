import StrategyDepot from "./StrategyDepot";

//Design Pattern Strategy : algorithme spécifique (dépôt espèce) de résolution d'une opération générique : dépôt
export default class DepotEspece implements StrategyDepot {
    execute(): boolean {
        //TODO: implémenter logique métier
        //dépôt espece --> solde_compter la somme et comparer avec la somme déclarée
        return true;
    }
}