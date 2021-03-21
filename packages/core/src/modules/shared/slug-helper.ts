import {
  AnyEntity,
  EntityManager,
  EntityName,
  EntityRepository,
  MikroORM,
} from '@mikro-orm/core';
import slugify from 'slugify';

export class SlugHelper {
  async checkSlugAvailability<T extends { slug: string }>(
    repo: EntityRepository<T>,
    slug: string,
  ): Promise<boolean> {
    const entity = await repo.findOne({ slug } as never);

    return Boolean(!entity);
  }

  async getAvailableSlug<T extends { slug: string }>(
    repo: EntityRepository<T>,
    str: string,
  ): Promise<string> {
    const rawSlug = slugify(str, { lower: true, strict: true });

    const regexp = new RegExp(`^${rawSlug}$|^${rawSlug}-(\\d+)$`);

    const entities = await repo.find({
      slug: { $re: regexp.source },
    } as never);

    if (entities.length) {
      const slugSequence = new Set<number>();

      entities.forEach(({ slug }) => {
        const match = slug.match(regexp);
        if (match) {
          const strNumber = match[1];

          if (strNumber) {
            const number = parseInt(strNumber);

            slugSequence.add(number);
          } else {
            slugSequence.add(0);
          }
        }
      });

      let counter = 1;
      while (slugSequence.has(counter)) {
        counter++;
      }

      return `${rawSlug}-${counter}`;
    }
    return rawSlug;
  }
}
