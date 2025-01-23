import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Repair } from "./repair.model";
import { encriptAdapter } from "../../../config";

export enum UserStatus {
  AVAILABLE = 'available',
  DISABLED = 'disabled'
}

export enum UserRole {
  CLIENT = 'client',
  EMPLOYEE = 'employee'
}

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
      default: UserStatus.AVAILABLE,
      enum: [UserStatus.AVAILABLE, UserStatus.DISABLED],
    })
    status: UserStatus.AVAILABLE | UserStatus.DISABLED;
  
    @Column({
      type: 'varchar',
      length: 50,
      nullable: false,
      enum: [UserRole.CLIENT, UserRole.EMPLOYEE],
    })
    role: UserRole.CLIENT | UserRole.EMPLOYEE;  
    
    @OneToMany(() => Repair, (repair) => repair.user)
    repairs: Repair[];  
    
    @BeforeInsert()
    encryptedPassword() {
      this.password = encriptAdapter.hash(this.password);
    }
}