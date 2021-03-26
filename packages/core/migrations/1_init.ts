import { Migration } from '@mikro-orm/migrations';

export default class extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "roles" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "is_admin" bool not null default false, "permissions" text[] not null default \'{}\');',
    );

    this.addSql(
      'create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "firstname" varchar(255) not null, "lastname" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role_id" int4 not null);',
    );

    this.addSql(
      'create table "categories" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" varchar(255) not null, "slug" varchar(255) not null, "active" bool not null default true, "parent_id" int4 null);',
    );
    this.addSql(
      'create index "categories_slug_index" on "categories" ("slug");',
    );
    this.addSql(
      'alter table "categories" add constraint "categories_slug_unique" unique ("slug");',
    );

    this.addSql(
      'create table "products" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" varchar(255) not null, "description" varchar(255) null, "category_id" int4 not null);',
    );

    this.addSql(
      'create table "product_variants" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "slug" varchar(255) not null, "price" int4 not null, "product_id" int4 not null);',
    );
    this.addSql(
      'create index "product_variants_slug_index" on "product_variants" ("slug");',
    );
    this.addSql(
      'alter table "product_variants" add constraint "product_variants_slug_unique" unique ("slug");',
    );

    this.addSql(
      'create table "attributes" ("id" serial primary key, "name" varchar(255) not null);',
    );

    this.addSql(
      'create table "attributes_values" ("id" serial primary key, "value" varchar(255) not null, "attribute_id" int4 not null);',
    );

    this.addSql(
      'create table "product_variants_attributes_values" ("product_variant_id" int4 not null, "attribute_value_id" int4 not null);',
    );
    this.addSql(
      'alter table "product_variants_attributes_values" add constraint "product_variants_attributes_values_pkey" primary key ("product_variant_id", "attribute_value_id");',
    );

    this.addSql(
      'alter table "users" add constraint "users_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "categories" add constraint "categories_parent_id_foreign" foreign key ("parent_id") references "categories" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "products" add constraint "products_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "product_variants" add constraint "product_variants_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "attributes_values" add constraint "attributes_values_attribute_id_foreign" foreign key ("attribute_id") references "attributes" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "product_variants_attributes_values" add constraint "product_variants_attributes_values_product_variant_id_foreign" foreign key ("product_variant_id") references "product_variants" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "product_variants_attributes_values" add constraint "product_variants_attributes_values_attribute_value_id_foreign" foreign key ("attribute_value_id") references "attributes_values" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'create index "attributes_values_value_index" on "attributes_values" ("value");',
    );
  }
}
