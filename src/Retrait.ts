import OperationBanquaire from "./OperationBanquaire";

export default class Retrait extends OperationBanquaire {
    execute(): boolean {
        if (this.client.solde_compte >= this.montant) {
            this.client.solde_compte -= this.montant;
            return true;
        } else {
            return false;
        }
    }
}