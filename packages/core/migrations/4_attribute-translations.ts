import { Migration } from '@mikro-orm/migrations';

export class Migration20210329061733 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "attributes" add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null;',
    );
    this.addSql('alter table "attributes" drop column "name";');

    this.addSql(
      'create table "attribute_translations" ("language_code" varchar(3) not null, "attribute_id" int4 not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);',
    );
    this.addSql(
      'alter table "attribute_translations" add constraint "attribute_translations_pkey" primary key ("language_code", "attribute_id");',
    );

    this.addSql(
      'alter table "attribute_translations" add constraint "attribute_translations_attribute_id_foreign" foreign key ("attribute_id") references "attributes" ("id") on update cascade on delete cascade;',
    );
  }
}
