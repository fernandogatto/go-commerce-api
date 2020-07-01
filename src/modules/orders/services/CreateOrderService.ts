import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const findCustomer = await this.customersRepository.findById(customer_id);

    if (!findCustomer) {
      throw new AppError('Customer not found');
    }

    const products_id = products.map(product => ({ id: product.id }));

    const findAllProducts = await this.productsRepository.findAllById(
      products_id,
    );

    if (findAllProducts.length < products_id.length) {
      throw new AppError('Product not found');
    }

    const productsInStock = findAllProducts.map(updatedProduct => {
      const { quantity } = products.find(
        product => product.id === updatedProduct.id,
      ) as IProduct;

      return {
        id: updatedProduct.id,
        quantity: updatedProduct.quantity - quantity,
      };
    });

    if (productsInStock.some(product => product.quantity < 0)) {
      throw new AppError('Product do not have this quantity in stock');
    }

    const order = await this.ordersRepository.create({
      customer: findCustomer,
      products: findAllProducts.map(product => {
        const findProduct = products.find(p => p.id === product.id) as IProduct;

        return {
          quantity: findProduct?.quantity,
          product_id: product.id,
          price: product.price,
        };
      }),
    });

    await this.productsRepository.updateQuantity(productsInStock);

    return order;
  }
}

export default CreateOrderService;
