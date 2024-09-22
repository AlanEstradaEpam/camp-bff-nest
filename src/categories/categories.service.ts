import { Injectable } from '@nestjs/common';
import { Category } from './interfaces/category.interface';
import { MagentoCategory } from './interfaces/magento.category.interface';
import { mapMagentoCategories } from './utils';
import { MagentoService } from 'src/magento/magento.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly magentoService: MagentoService) {}

  async getCategories(): Promise<Category[]> {
    const magentoCategory =
      await this.magentoService.get<MagentoCategory>('categories');

    return mapMagentoCategories([magentoCategory]);
  }
}
