import { Constructor } from "@mikro-orm/core";
import slugify from "slugify";

import { BaseEntity } from "../base.entity";
import { BaseService } from "../base.service";

type EntityWithSlug = BaseEntity & { slug: string };

export const slugHelperMixin = <T extends EntityWithSlug>(
  Service: Constructor<BaseService<T>>
) => {
  class SlugHelperMixin extends Service {
    async checkSlugAvailability(slug: string): Promise<Boolean> {
      const entity = await this.findOne({ slug } as never);

      return Boolean(!entity);
    }

    async getAvailableSlug(str: string): Promise<string> {
      const rawSlug = slugify(str, { lower: true, strict: true });

      const regexp = new RegExp(`^${rawSlug}$|^${rawSlug}-(\\d+)$`);

      const entities = await this.find({
        slug: { $re: regexp.source },
      } as never);

      if (entities.length) {
        const slugSequence = new Set<number>();

        entities.forEach(({ slug }) => {
          const [_, strNumber] = slug.match(regexp)!;
          if (strNumber) {
            const number = parseInt(strNumber);

            slugSequence.add(number);
          } else {
            slugSequence.add(0);
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

  return SlugHelperMixin;
};
