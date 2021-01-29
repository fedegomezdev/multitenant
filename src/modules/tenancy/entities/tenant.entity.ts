import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tenant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  host: string;

  @Column()
  port: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 'postgres' })
  databaseType: string;

  @Column({ default: false })
  ssl: boolean;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
