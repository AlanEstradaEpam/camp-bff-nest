import { MagentoCategory } from './interfaces/magento.category.interface';
import { Ancestor, Category, Parent } from './interfaces/category.interface';
import { getSlug } from 'src/utils/getSlug';

/**
 * Maps Magento categories to a custom Category structure.
 *
 * @param rootCategories - The root categories from Magento.
 * @returns An array of transformed categories.
 *
 * The function processes each root category and its children recursively,
 * transforming them into a custom Category structure. Each category is
 * enriched with additional information such as its ancestors and a slug.
 *
 * @typedef {Object} Category
 * @property {string} id - The unique identifier of the category.
 * @property {string} name - The name of the category.
 * @property {string} description - The description of the category.
 * @property {string} slug - The slug generated from the category ID.
 * @property {Parent | null} parent - The parent category information.
 * @property {Ancestor[]} ancestors - The list of ancestor categories.
 *
 * @typedef {Object} MagentoCategory
 * @property {string} id - The unique identifier of the Magento category.
 * @property {string} name - The name of the Magento category.
 * @property {string} description - The description of the Magento category.
 * @property {MagentoCategory[]} children_data - The child categories of the Magento category.
 *
 * @typedef {Object} Parent
 * @property {string} id - The unique identifier of the parent category.
 *
 * @typedef {Object} Ancestor
 * @property {string} id - The unique identifier of the ancestor category.
 * @property {'category'} type - The type of the ancestor, which is always 'category'.
 */
/**
 * AI Generated
 * 
 * Maps Magento categories to a custom Category structure.
 * 
 * @param rootCategories - The root categories from Magento.
 * @returns An array of transformed Category objects.
 */
export const mapMagentoCategories = (rootCategories): Category[] => {
  const result: Category[] = [];

  const transformCategory = (
    category: MagentoCategory,
    parent: Parent | null,
    ancestors: Ancestor[]
  ) => {
    const currentAncestors: Ancestor[] = [
      ...ancestors,
      ...(parent ? [{ id: parent.id, type: 'category' as const }] : []),
    ];

    const transformedCategory: Category = {
      id: category.id,
      name: category.name,
      description: category.description || '',
      slug: getSlug(category.id), // Creating a slug from the name
      parent: parent,
      ancestors: currentAncestors,
    };

    result.push(transformedCategory);

    category.children_data.forEach((childCategory) => {
      transformCategory(childCategory, { id: category.id }, currentAncestors);
    });
  };

  rootCategories.forEach((rootCategory) => {
    transformCategory(rootCategory, null, []);
  });

  return result;
}