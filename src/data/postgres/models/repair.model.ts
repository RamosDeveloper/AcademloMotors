import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

@Entity('repairs')
export class Repair extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @CreateDateColumn({type: 'timestamp'})
    date: Date;
  
    @Column({
      type: 'varchar',
      length: 50,
      default: 'pending',
      enum: ['pending', 'completed', 'cancelled'],
    })
    status: 'pending' | 'completed' | 'cancelled';

    @ManyToOne(() => User, (user) => user.repairs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;    
}