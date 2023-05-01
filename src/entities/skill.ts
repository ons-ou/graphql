import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('skill')
@ObjectType()
export class Skill{
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String)
    designation: string;
}