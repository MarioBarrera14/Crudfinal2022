import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductos1624747881678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "productos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "nombreProducto",
                        type: "varchar"
                    },
                    {
                        name: "descripcion",
                        type: "varchar"
                    },
                    {
                        name: "precio",
                        type: "int"
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
        await queryRunner.dropTable("productos");
    }

}
