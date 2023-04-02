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
import sortKeysRecursive from "sort-keys-recursive";
// import stringify from 'json-stringify-deterministic';
const stringify = require('json-stringify-deterministic');

export class FoodContract extends Contract {
    async InitLedger(ctx: Context) {

        console.info("============= START : Initialize Ledger ===========");
        
        const products: {
            name: Product["name"];
            price: Product["price"];
            quantity: Product["quantity"];
            location: Product["location"];  
        }[] = [
                {
                    name: "Apple",
                    quantity: "100 cartons",
                    price: 30,
                    location: {
                        lat: 19.5,
                        lng: 72.0,
                    },
                },
                {
                    name: "Honey",
                    quantity: "500 jars",
                    price: 350,
                    location: {
                        lat: 20.0,
                        lng: -30.0,
                    },
                },
                {
                    name: "Jam",
                    quantity: "1000 bottles",
                    price: 60,
                    location: {
                        lat: 50.0,
                        lng: 10.1,
                    },
                },
            ];

        for (let i = 0; i < products.length; i++) {
            await ctx.stub.putState(
                "Product " + `${i + 1}`,
                Buffer.from(JSON.stringify(products[i]))
            );
            console.info("Added ↔ ", products[i]);
        }

        console.info("============= END : Initialize Ledger ===========");
    }

    // ProductExists returns true when asset with given ID exists in world state.
    @Transaction(false)
    @Returns("boolean")
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
        location: Product["location"]
    ) {
        console.info("============= Start : Create Product ===========");

        const exists = await this.ProductExists(ctx, id);

        if (exists) {
            throw new Error(`A food product with ${id} already exists!`);
        }

        const product = {
            name,
            id,
            quantity,
            price,
            location,
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));

        console.info("============= END : Create Product ===========");

        return `Product with ${id} created successfully`;
    }

    // GetAllProducts returns all assets found in the world state.
    @Transaction(false)
    @Returns("string")
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
    @Transaction(false)
    @Returns("string")
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
    @Transaction()
    public async UpdateAsset(
        ctx: Context,
        id: Product["id"],
        quantity: Product["quantity"],
        price: Product["price"],
        name: Product["name"],
        location: Product["location"]
    ): Promise<void> {
        
        console.info("============= Start : Update Product ===========");
        
        const exists = await this.ProductExists(ctx, id);

        if (!exists) {
            throw new Error(`A food product with ${id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            id,
            quantity,
            price,
            name,
            location,
        };

        console.info("============= End : Update Product ===========");

        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(
            id,
            Buffer.from(stringify(sortKeysRecursive(updatedAsset)))
        );
    }

    // DeleteAsset deletes an given asset from the world state.
    @Transaction()
    public async DeleteAsset(ctx: Context, id: Product["id"]): Promise<void> {
        
        console.info("============= Start : Delete Product ===========");
        
        const exists = await this.ProductExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        console.info("============= End : Delete Product ===========");

        return ctx.stub.deleteState(id);
    }

    // TransferProduct updates the owner field of asset with given id in the world state, and returns the old owner.
    @Transaction()
    public async TransferProduct(
        ctx: Context,
        id: Product["id"],
        newActor: Product["actor"]
    ): Promise<string> {

        console.info("============= Start : Transfer Product ===========");

        const assetString = await this.GetProduct(ctx, id);
        const asset = JSON.parse(assetString);
        const oldActor = asset.Actor;
        asset.Actor = newActor;

        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(
            id,
            Buffer.from(stringify(sortKeysRecursive(asset)))
        );

        console.info("============= End : Transfer Product ===========");

        return oldActor;
    }
}
