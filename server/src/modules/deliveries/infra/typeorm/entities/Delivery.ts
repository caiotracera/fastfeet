import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('deliveries')
export default class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deliveryman_id: string;

  @ManyToOne(() => User, user => user.delivery, { eager: true })
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: User;

  @Column()
  product: string;

  @Column()
  address: string;

  @Column()
  postal_code: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  signature_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  canceled_at: Date;

  @Expose({ name: 'signature_url' })
  getSignatureUrl(): string | null {
    if (!this.signature_id) {
      return null;
    }
    return `http://${process.env.APP_API_URL}/files/${this.signature_id}`;
  }
}
