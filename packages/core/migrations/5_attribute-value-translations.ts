import { Migration } from '@mikro-orm/migrations';

export class Migration20210409143242 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "attributes_values" add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null;',
    );
    this.addSql('drop index "attributes_values_value_index";');
    this.addSql('alter table "attributes_values" drop column "value";');

    this.addSql(
      'create table "attribute_value_translations" ("language_code" varchar(3) not null, "attribute_value_id" int4 not null, "updated_at" timestamptz(0) not null, "value" varchar(255) not null);',
    );
    this.addSql(
      'alter table "attribute_value_translations" add constraint "attribute_value_translations_pkey" primary key ("language_code", "attribute_value_id");',
    );

    this.addSql(
      'alter table "attribute_value_translations" add constraint "attribute_value_translations_attribute_value_id_foreign" foreign key ("attribute_value_id") references "attributes_values" ("id") on update cascade on delete cascade;',
    );
  }
}
