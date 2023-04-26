/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Context,
    Contract,
    Transaction,
    Returns,
    Info,
} from "fabric-contract-api";
import { Product } from "./Models/product";
// import sortKeysRecursive from "sort-keys-recursive";
const sortKeysRecursive = require("sort-keys-recursive");
// import stringify from 'json-stringify-deterministic';
const stringify = require('json-stringify-deterministic');

export class FoodContract extends Contract {
    // @Transaction()
    async InitLedger(ctx: Context) {

        console.info("============= START : Initialize Ledger ===========");

        const products: {
            name: Product["name"];
            price: Product["price"];
            quantity: Product["quantity"];
            location: Product["location"];
            actor: Product["actor"]
            imageUrl: Product["imageUrl"]
        }[] = [
                {
                    name: "Apple",
                    quantity: "100 cartons",
                    price: 30,
                    location: {
                        lat: 19.5,
                        lng: 72.0,
                    },
                    actor: "CONSUMER",
                    imageUrl:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-photo%2Fripe-apples-display-sale-on-260nw-1822577225.jpg&tbnid=_80h5A5M7JA99M&vet=12ahUKEwjklJH-6sf-AhUZ5HMBHcg9CRAQMygLegUIARCAAg..i&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fapple-carton&docid=iGQDBsh5yQqLEM&w=426&h=280&q=apple%20in%20carton&ved=2ahUKEwjklJH-6sf-AhUZ5HMBHcg9CRAQMygLegUIARCAAg"
                },
                {
                    name: "Honey",
                    quantity: "500 jars",
                    price: 350,
                    location: {
                        lat: 20.0,
                        lng: -30.0,
                    },

                    actor: "CONSUMER",
                    imageUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2F5.imimg.com%2Fdata5%2FCJ%2FGC%2FWB%2FSELLER-1177031%2Fwooden-beehive-box-500x500.jpg&tbnid=fQ3GXsWFhXD6pM&vet=12ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg..i&imgrefurl=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Fwooden-beehive-box-with-honey-bees-20959147173.html&docid=FahB3lcm3XrfKM&w=500&h=500&q=honey%20in%20a%20box%20images&ved=2ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg"
                },
                {
                    name: "Jam",
                    quantity: "1000 bottles",
                    price: 60,
                    location: {
                        lat: 50.0,
                        lng: 10.1,
                    },

                    actor: "CONSUMER",
                    imageUrl:"https://www.google.com/imgres?imgurl=https%3A%2F%2F5.imimg.com%2Fdata5%2FCJ%2FGC%2FWB%2FSELLER-1177031%2Fwooden-beehive-box-500x500.jpg&tbnid=fQ3GXsWFhXD6pM&vet=12ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg..i&imgrefurl=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Fwooden-beehive-box-with-honey-bees-20959147173.html&docid=FahB3lcm3XrfKM&w=500&h=500&q=honey%20in%20a%20box%20images&ved=2ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg"
                },
                {
                    name: "Mango",
                    quantity: "20 boxes",
                    price: 450,
                    location: {
                        lat: 21.01,
                        lng: 72.0,
                    },
                    actor: "PRODUCER",
                    imageUrl:"https://www.google.com/imgres?imgurl=https%3A%2F%2F5.imimg.com%2Fdata5%2FCJ%2FGC%2FWB%2FSELLER-1177031%2Fwooden-beehive-box-500x500.jpg&tbnid=fQ3GXsWFhXD6pM&vet=12ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg..i&imgrefurl=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Fwooden-beehive-box-with-honey-bees-20959147173.html&docid=FahB3lcm3XrfKM&w=500&h=500&q=honey%20in%20a%20box%20images&ved=2ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg"
                },
                {
                    name: "Grapes",
                    quantity: "25kgs",
                    price: 125,
                    location: {
                        lat: 25.44,
                        lng: 91.0,
                    },
                    actor: "RETAILER",
                    imageUrl:"https://www.google.com/imgres?imgurl=https%3A%2F%2F5.imimg.com%2Fdata5%2FCJ%2FGC%2FWB%2FSELLER-1177031%2Fwooden-beehive-box-500x500.jpg&tbnid=fQ3GXsWFhXD6pM&vet=12ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg..i&imgrefurl=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Fwooden-beehive-box-with-honey-bees-20959147173.html&docid=FahB3lcm3XrfKM&w=500&h=500&q=honey%20in%20a%20box%20images&ved=2ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg"
                },
                {
                    name: "Onion",
                    quantity: "1000 kgs",
                    price: 25,
                    location: {
                        lat: 12.45,
                        lng: 27.0,
                    },
                    actor: "CONSUMER",
                    imageUrl:"https://www.google.com/imgres?imgurl=https%3A%2F%2F5.imimg.com%2Fdata5%2FCJ%2FGC%2FWB%2FSELLER-1177031%2Fwooden-beehive-box-500x500.jpg&tbnid=fQ3GXsWFhXD6pM&vet=12ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg..i&imgrefurl=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Fwooden-beehive-box-with-honey-bees-20959147173.html&docid=FahB3lcm3XrfKM&w=500&h=500&q=honey%20in%20a%20box%20images&ved=2ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg"
                },
                {
                    name: "Oranges",
                    quantity: "10kgs",
                    price:100,
                    location: {
                        lat: 86.5,
                        lng: 31.01,
                    },
                    actor: "CONSUMER",
                    imageUrl:"https://www.google.com/imgres?imgurl=https%3A%2F%2F5.imimg.com%2Fdata5%2FCJ%2FGC%2FWB%2FSELLER-1177031%2Fwooden-beehive-box-500x500.jpg&tbnid=fQ3GXsWFhXD6pM&vet=12ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg..i&imgrefurl=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Fwooden-beehive-box-with-honey-bees-20959147173.html&docid=FahB3lcm3XrfKM&w=500&h=500&q=honey%20in%20a%20box%20images&ved=2ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg"
                },
                {
                    name: "Cheese",
                    quantity: "25 boxes",
                    price: 183,
                    location: {
                        lat: 56.65,
                        lng: 45.12,
                    },
                    actor: "CONSUMER",
                    imageUrl:"https://www.google.com/imgres?imgurl=https%3A%2F%2F5.imimg.com%2Fdata5%2FCJ%2FGC%2FWB%2FSELLER-1177031%2Fwooden-beehive-box-500x500.jpg&tbnid=fQ3GXsWFhXD6pM&vet=12ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg..i&imgrefurl=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Fwooden-beehive-box-with-honey-bees-20959147173.html&docid=FahB3lcm3XrfKM&w=500&h=500&q=honey%20in%20a%20box%20images&ved=2ahUKEwjBi-rQ68f-AhUL-nMBHVIfAhIQMygKegUIARCLAg"
                },
            ];

        for (let i = 0; i < products.length; i++) {
            await ctx.stub.putState(
                `${i + 1}`,
                Buffer.from(JSON.stringify(products[i]))
            );
            console.info("Added ↔ ", products[i]);
        }

        console.info("============= END : Initialize Ledger ===========");
    }

    // ProductExists returns true when asset with given ID exists in world state.
    // @Transaction(false)
    // @Returns("boolean")
    public async ProductExists(ctx: Context, id: string): Promise<boolean> {

        console.info("============= START : Check Product ===========")

        const assetJSON = await ctx.stub.getState(id);

        console.info("============= END : Check Product ===========")

        return assetJSON && assetJSON.length > 0;
    }

    async CreateProduct(
        ctx: Context,
        name: Product["name"],
        id: Product["id"],
        quantity: Product["quantity"],
        price: Product["price"],
        location: Product["location"],
        actor: Product["actor"],
        imageUrl: Product["imageUrl"]
    ) {
        console.info("============= Start : Create Product ===========");

        const exists = await this.ProductExists(ctx, id);

        if (exists) {
            throw new Error(`A food product with ${id} already exists!`);
        }

        const product = {
            name,
            quantity,
            price,
            location,
            actor,
            imageUrl,
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));

        console.info("============= END : Create Product ===========");

        return `Product with ${id} created successfully`;
    }

    // GetAllProducts returns all assets found in the world state.
    // @Transaction(false)
    // @Returns("string")
    public async GetAllProducts(ctx: Context): Promise<string> {

        const allResults = [];

        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange("", "");

        let result = await iterator.next();

        while (!result.done) {

            const strValue = Buffer.from(
                result.value.value.toString()
            ).toString("utf8");

            let record;

            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }

            allResults.push(record);

            result = await iterator.next();
        }

        return JSON.stringify(allResults);
    }

    // GetProduct returns the food stored in the world state with given id.
    // @Transaction(false)
    // @Returns("string")
    public async GetProduct(ctx: Context, id: Product["id"]): Promise<string> {

        console.info("============= Start : Get Product ===========");

        const productAsBytes = await ctx.stub.getState(id); // get the asset from chaincode state

        if (!productAsBytes || productAsBytes.length === 0) {
            throw new Error(`The product ${id} does not exist`);
        }

        console.info("============= END : Get Product ===========");

        return productAsBytes.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    // @Transaction()
    public async UpdateProduct(
        ctx: Context,
        id: Product["id"],
        quantity: Product["quantity"],
        price: Product["price"],
        name: Product["name"],
        location: Product["location"],
        actor: Product["actor"],
        imageUrl:Product["imageUrl"]
    ): Promise<void> {

        console.info("============= Start : Update Product ===========");

        const exists = await this.ProductExists(ctx, id);

        if (!exists) {
            throw new Error(`A food product with ${id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            quantity,
            price,
            name,
            location,
            actor,
            imageUrl
        };

        console.info("============= End : Update Product ===========");

        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(
            id,
            Buffer.from(JSON.stringify(updatedAsset))
        );
    }

    // DeleteAsset deletes an given asset from the world state.
    // @Transaction()
    public async DeleteProduct(ctx: Context, id: Product["id"]): Promise<void> {

        console.info("============= Start : Delete Product ===========");

        const exists = await this.ProductExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        console.info("============= End : Delete Product ===========");

        return ctx.stub.deleteState(id);
    }

    // TransferProduct updates the owner field of asset with given id in the world state, and returns the old owner.
    // @Transaction()
    public async TransferProduct(
        ctx: Context,
        id: Product["id"],
        newActor: Product["actor"]
    ): Promise<string> {

        console.info("============= Start : Transfer Product ===========");

        const assetString = await this.GetProduct(ctx, id);
        const asset: Product = JSON.parse(assetString);
        const oldActor = asset.actor;
        asset.actor = newActor;

        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await this.UpdateProduct(ctx, id, asset.quantity, asset.price, asset.name, asset.location, newActor,asset.imageUrl);

        console.info("============= End : Transfer Product ===========");

        return oldActor;
    }
}
