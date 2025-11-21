import { Module } from '@nestjs/common';
import { OrganizationStructureController } from './organization-structure.controller';
import { OrganizationStructureService } from './organization-structure.service';

@Module({
  controllers: [OrganizationStructureController],
  providers: [OrganizationStructureService]
})
export class OrganizationStructureModule {}
