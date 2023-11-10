import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

import { CreateSharingLinkBodyDto, UpdateSharingLinkBodyDto } from './dto';

@Injectable()
export class LinkService {
  constructor(private databaseService: DatabaseService) {}

  async getList(ownerId: number) {
    const links = await this.databaseService.sharingLink.findMany({
      where: { ownerId },
    });

    return links;
  }

  async create(ownerId: number, body: CreateSharingLinkBodyDto) {
    const link = await this.databaseService.sharingLink.create({
      data: {
        ownerId,
        ...body,
      },
    });

    return link;
  }

  async updateLink(ownerId: number, body: UpdateSharingLinkBodyDto) {
    const { id, ...data } = body;

    const link = await this.databaseService.sharingLink.update({
      where: { ownerId, id },
      data: {
        ...data,
      },
    });

    return link;
  }

  async removeLink(id: number, ownerId: number) {
    const link = await this.databaseService.sharingLink.delete({
      where: { id, ownerId },
    });

    return link;
  }
}
