import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Skill } from "./skill";

@Entity('cv')
@ObjectType()
export class Cv{
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    firstname: string;

    @Column()
    @Field(() => Number)
    age: number;

    @Column()
    @Field(() => String)
    cin: string;

    @Column()
    @Field(() => String)
    job: string;

    @Column()
    @Field(() => String)
    path: string;

    @ManyToOne(() => User ,(user) => user.cvs, {cascade: true})
    user: User;

    @ManyToMany(() => Skill, { cascade: true, eager: true })
    @JoinTable({
      name: 'cv_skills',
      joinColumn: {
        name: 'cv_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'skill_id',
        referencedColumnName: 'id',
      },
    })
    skills: Skill[];

}
