"use strict";Object.defineProperty(exports, "__esModule", {value: true});

@Entity('users')
class User {
    PrimaryGeneratedColumn('uuid')
    

    Column()
    

    Column({ unique: true })
    

    Column()
    

    Column()
    

    Column()
    

    Column({
        default: true
    })
    

    CreateDateColumn()
    

    CreateDateColumn()
    
}

exports. default = User;