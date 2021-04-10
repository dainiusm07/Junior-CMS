import { Migration } from '@mikro-orm/migrations';

export default class extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "categories" drop column "name";');
    this.addSql('drop index "categories_slug_index";');
    this.addSql(
      'alter table "categories" drop constraint "categories_slug_unique";',
    );
    this.addSql('alter table "categories" drop column "slug";');

    this.addSql(
      'create table "category_translations" ("language_code" varchar(3) not null, "category_id" int4 not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "slug" varchar(255) not null);',
    );
    this.addSql(
      'create index "category_translations_slug_index" on "category_translations" ("slug");',
    );
    this.addSql(
      'alter table "category_translations" add constraint "category_translations_slug_unique" unique ("slug");',
    );
    this.addSql(
      'alter table "category_translations" add constraint "category_translations_pkey" primary key ("language_code", "category_id");',
    );

    this.addSql(
      'alter table "category_translations" add constraint "category_translations_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade on delete cascade;',
    );
  }
}
