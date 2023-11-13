import { Injectable, NotFoundException } from '@nestjs/common';
import { LinkService } from 'src/link/link.service';
import { OrderService } from 'src/order/order.service';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class SharedInfoService {
  constructor(
    private profileService: ProfileService,
    private linkService: LinkService,
    private orderService: OrderService,
  ) {}

  async getSharedInfo(id: number) {
    console.log('id', id);

    const profile = await this.profileService.getProfileInfo(id);

    console.log('profile', profile);

    if (!profile) {
      throw new NotFoundException();
    }

    const { data: links } = await this.linkService.getList(id);
    const { data: order } = await this.orderService.getOrder(id);

    return { profile, links, order };
  }
}
