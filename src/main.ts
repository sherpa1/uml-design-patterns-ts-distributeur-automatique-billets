import Banque from "./Banque";
import Client from "./Client";

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