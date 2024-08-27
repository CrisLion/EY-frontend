import { WorldBankItem } from "./world-bank-item";

export class WorldBankResponse {
    size: number;
    worldBankItems: WorldBankItem[];

    constructor() {
        this.size = 0;
        this.worldBankItems = [];
    }
}
