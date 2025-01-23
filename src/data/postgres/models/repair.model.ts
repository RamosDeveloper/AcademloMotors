import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

export enum RepairStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

@Entity('repairs')
export class Repair extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @CreateDateColumn({type: 'timestamp'})
    date: Date;
  
    @Column({
      type: 'varchar',
      length: 50,
      default: RepairStatus.PENDING,
      enum: [RepairStatus.PENDING, RepairStatus.COMPLETED, RepairStatus.CANCELLED],
    })
    status: RepairStatus.PENDING | RepairStatus.COMPLETED | RepairStatus.CANCELLED;

    @Column({ type: 'int', nullable: false })
    motorsNumber: number;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;  

    @ManyToOne(() => User, (user) => user.repairs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;    
}