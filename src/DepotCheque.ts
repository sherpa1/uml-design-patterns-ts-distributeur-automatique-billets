import StrategyDepot from "./StrategyDepot";

//Design Pattern Strategy : algorithme spécifique (dépôt chèque) de résolution d'une opération générique : dépôt
export default class DepotCheque implements StrategyDepot {
    execute(): boolean {
        //TODO: implémenter logique métier
        //contacter la banque d'origine et vérifier que la somme est disponible
        return true;
    }
}