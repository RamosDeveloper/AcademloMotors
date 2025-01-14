import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Repair } from "./repair.model";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
  
    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;
  
    @Column({
      type: 'varchar',
      length: 50,
      default: 'available',
      enum: ['available', 'disabled'],
    })
    status: 'available' | 'disabled';
  
    @Column({
      type: 'varchar',
      length: 50,
      nullable: false,
      enum: ['client', 'employee'],
    })
    role: 'client' | 'employee';  
    
    @OneToMany(() => Repair, (repair) => repair.user)
    repairs: Repair[];    
}