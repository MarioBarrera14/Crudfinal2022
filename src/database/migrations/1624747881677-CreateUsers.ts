import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1624747881677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "usuarios",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "nombreUsuario",
                        type: "varchar"
                    },
                    {
                        name: "eMail",
                        type: "varchar"
                    },
                    {
                        name: "teléfono",
                        type: "varchar"
                    },
                    {
                        name: "ciudad",
                        type: "varchar"
                    },
                    {
                        name: "provincia",
                        type: "varchar",
                        length: "2"
                    },
                    {
                        name: "fechaCreacion",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "fechaModificacion",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("usuarios");
    }

}
