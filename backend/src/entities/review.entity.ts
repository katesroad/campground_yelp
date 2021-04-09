import { IsDefined, Max, Min } from 'class-validator';
import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Campground } from './campground.entity';

@Entity('reviews')
export class Review extends AbstractEntity {
  @Column('text')
  @IsDefined()
  body: string;

  @Max(5)
  @Min(1)
  @Column()
  ratting: number;

  @Column()
  @IsDefined()
  author: string;

  @ManyToOne(() => Campground, (campground) => campground.reviews)
  campground: string;
}
