import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { Product } from "src/products/entities/product.entity";

// this code is to verify any request received to add new products 
//  the product needs to macth the interface without id
const validateNewProduct = (request: Request) => {
    const expectedKeys: (keyof Product)[] = [
        "name",
        "description",
        "price",
        "stock",
        "imgUrl"
    ];

    // here we received the information throught body
    const product: Omit<Product, "id"> = request.body;
    const productKeys = Object.keys(product) as (keyof Product)[];

    // First we verify if all teh keys are present
    for (const key of expectedKeys) {
        if (!product[key]) {
            return false;
        }
    }

    // then verify if there is any extra key 
    for (const key of productKeys) {
        if (!expectedKeys.includes(key)) {
            return false;
        }
    }

    return true;
}

@Injectable()
export class ProductGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateNewProduct(request);
    }
}
