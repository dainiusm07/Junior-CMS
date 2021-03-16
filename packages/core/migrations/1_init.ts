import { Migration } from "@mikro-orm/migrations";

export default class extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "categories" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" jsonb null, "name" varchar(255) not null, "slug" varchar(255) not null, "active" bool not null default true, "parent_id" int4 null);'
    );
    this.addSql(
      'create index "categories_slug_index" on "categories" ("slug");'
    );
    this.addSql(
      'alter table "categories" add constraint "categories_slug_unique" unique ("slug");'
    );

    this.addSql(
      'create table "products" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" jsonb null, "name" varchar(255) not null, "slug" varchar(255) not null, "description" varchar(255) null, "price" int4 not null);'
    );
    this.addSql('create index "products_slug_index" on "products" ("slug");');
    this.addSql(
      'alter table "products" add constraint "products_slug_unique" unique ("slug");'
    );

    this.addSql(
      'create table "roles" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "is_admin" bool not null default false, "permissions" text[] not null default \'{}\');'
    );

    this.addSql(
      'create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" jsonb null, "firstname" varchar(255) not null, "lastname" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role_id" int4 not null);'
    );

    this.addSql(
      'alter table "categories" add constraint "categories_parent_id_foreign" foreign key ("parent_id") references "categories" ("id") on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table "users" add constraint "users_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade;'
    );
  }
}
