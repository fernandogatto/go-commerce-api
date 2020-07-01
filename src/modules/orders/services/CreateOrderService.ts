import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IOrderProduct {
  product_id: string;
  price: number;
  quantity: number;
}

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

    // get the products IDs from request
    const products_id = products.map(product => ({ id: product.id }));

    // find all products with this id
    const findAllProducts = await this.productsRepository.findAllById(
      products_id,
    );

    if (findAllProducts.length !== products.length) {
      throw new AppError('One of this products does not exists');
    }

    const productsInStock: IProduct[] = products.map(product => {
      const existingQuantity =
        findAllProducts.find(findProduct => findProduct.id === product.id)
          ?.quantity || 0;

      return {
        id: product.id,
        quantity: existingQuantity - product.quantity,
      };
    });

    if (productsInStock.some(product => product.quantity < 0)) {
      throw new AppError('Product do not have this quantity in stock');
    }

    const insertProducts: IOrderProduct[] = products.map(product => ({
      product_id: product.id,
      price:
        findAllProducts.find(findProduct => findProduct.id === product.id)
          ?.price || 0,
      quantity: product.quantity,
    }));

    const order = await this.ordersRepository.create({
      customer: findCustomer,
      products: insertProducts,
    });

    await this.productsRepository.updateQuantity(productsInStock);

    return order;
  }
}

export default CreateOrderService;
