import { Entity, Property, PrimaryKey } from "@mikro-orm/core";

@Entity({ abstract: true })
export class BaseEntity {
  @PrimaryKey()
  id: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
