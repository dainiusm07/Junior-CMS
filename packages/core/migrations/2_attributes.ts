import { Migration } from "@mikro-orm/migrations";

export default class extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "attributes" ("id" serial primary key, "name" varchar(255) not null);'
    );

    this.addSql(
      'create table "attributes_values" ("id" serial primary key, "value" varchar(255) not null, "attribute_id" int4 not null);'
    );

    this.addSql(
      'create table "products_attributes_values" ("product_id" int4 not null, "attribute_value_id" int4 not null);'
    );
    this.addSql(
      'alter table "products_attributes_values" add constraint "products_attributes_values_pkey" primary key ("product_id", "attribute_value_id");'
    );

    this.addSql(
      'alter table "attributes_values" add constraint "attributes_values_attribute_id_foreign" foreign key ("attribute_id") references "attributes" ("id") on update cascade;'
    );

    this.addSql(
      'alter table "products_attributes_values" add constraint "products_attributes_values_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "products_attributes_values" add constraint "products_attributes_values_attribute_value_id_foreign" foreign key ("attribute_value_id") references "attributes_values" ("id") on update cascade on delete cascade;'
    );

    this.addSql(
      'create index "attributes_values_value_index" on "attributes_values" ("value");'
    );
  }

  async down() {
    this.addSql('drop table "attributes" cascade;');
    this.addSql('drop table "attributes_values" cascade;');
    this.addSql('drop table "products_attributes_values" cascade;');
  }
}
