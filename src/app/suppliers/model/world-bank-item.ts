import { IneligibilityPeriod } from "./ineligibility-period"

export class WorldBankItem {
    firmName: string;
    address: string | null;
    country: string;
    ineligibilityPeriod : IneligibilityPeriod;
    grounds: string;

    constructor() {
        this.firmName = "";
        this.address = "";
        this.country = "";
        this.ineligibilityPeriod = new IneligibilityPeriod();
        this.grounds = "";
    }
}
