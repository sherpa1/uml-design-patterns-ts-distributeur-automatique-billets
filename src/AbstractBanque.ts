import OperationBanquaire from "./OperationBanquaire";

export default abstract class AbstractBanque {
    abstract execute(operationBanquaire: OperationBanquaire): boolean;
}