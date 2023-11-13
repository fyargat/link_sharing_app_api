import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrderService {
  constructor(private databaseService: DatabaseService) {}

  async push(ownerId: number, linkId: number) {
    const order = await this.databaseService.order.update({
      where: { ownerId },
      data: {
        order: {
          push: linkId,
        },
      },
    });

    return order;
  }

  async getOrder(ownerId: number) {
    const orderData = await this.databaseService.order.findFirst({
      where: { ownerId },
      select: {
        order: true,
      },
    });

    return { data: orderData?.order };
  }

  async createOrder(ownerId: number) {
    const order = await this.databaseService.order.create({
      data: {
        ownerId,
        order: [],
      },
    });

    return order;
  }

  async updateOrder(ownerId: number, order: number[]) {
    const orderData = await this.databaseService.order.update({
      where: { ownerId },
      data: {
        order: order,
      },
      select: {
        order: true,
      },
    });

    return { data: orderData?.order };
  }

  async removeItem(ownerId: number, linkId: number) {
    const order = await this.databaseService.order.findFirst({
      where: { ownerId },
      select: {
        order: true,
      },
    });

    const newOrder = await this.databaseService.order.update({
      where: { ownerId },
      data: {
        order: {
          set: order?.order.filter((v) => v !== linkId),
        },
      },
    });

    return newOrder;
  }
}
