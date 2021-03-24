import { Migration } from '@mikro-orm/migrations';

export default class extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "products" drop column "name";');
    this.addSql('alter table "products" drop column "description";');

    this.addSql(
      'create table "product_translations" ("language_code" varchar(3) not null, "product_id" int4 not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "slug" varchar(255) not null, "description" varchar(255) null);',
    );
    this.addSql(
      'create index "product_translations_slug_index" on "product_translations" ("slug");',
    );
    this.addSql(
      'alter table "product_translations" add constraint "product_translations_slug_unique" unique ("slug");',
    );
    this.addSql(
      'alter table "product_translations" add constraint "product_translations_pkey" primary key ("language_code", "product_id");',
    );
    this.addSql(
      'alter table "product_translations" add constraint "product_translations_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade on delete cascade;',
    );
  }
}
