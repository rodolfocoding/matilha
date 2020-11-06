import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nome: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    carga_horaria: number

    @Column()
    setor: string

    @Column({
        default: true
    })
    ativo: boolean

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date
}

export default User;