import { ingredient } from "../shared/ingredient.model";

export class Reciepe {
    public name: string;
    public description: string;
    public imageUrl: string;
    public ingredient:ingredient[];

    constructor(name: string, desc: string, imageUrl: string,ingredient:ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imageUrl = imageUrl;
        this.ingredient=ingredient;
    }
}
