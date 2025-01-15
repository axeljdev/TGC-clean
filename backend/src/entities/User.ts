import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { IsEmail, IsStrongPassword } from "class-validator";
import { Ad } from "./Ad";
import { Tag } from "./Tag";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  hashedPassword: string;

  @OneToMany(() => Ad, (ad) => ad.createdBy)
  @Field(() => [Ad])
  ads: Ad[];

  @OneToMany(() => Tag, (tag) => tag.createdBy)
  @Field(() => [Tag])
  tags: Tag[];
}

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;
}
