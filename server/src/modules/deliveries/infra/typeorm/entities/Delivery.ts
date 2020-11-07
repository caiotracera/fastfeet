import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Expose, Exclude } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('deliveires')
export default class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deliveryman_id: string;

  @Exclude()
  @ManyToOne(() => User, user => user.id)
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
