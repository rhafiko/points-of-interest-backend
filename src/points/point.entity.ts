import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Point {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @Column()
  title: string;

  @ManyToOne((_type) => User, (user) => user.points, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
