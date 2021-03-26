import { Migration } from '@mikro-orm/migrations';

export default class extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "product_variants" rename column "slug" to "sku";',
    );

    this.addSql('drop index "product_variants_slug_index";');

    this.addSql(
      'alter table "product_variants" drop constraint "product_variants_slug_unique";',
    );

    this.addSql(
      'alter table "product_variants" add constraint "product_variants_sku_unique" unique ("sku");',
    );
  }
}
