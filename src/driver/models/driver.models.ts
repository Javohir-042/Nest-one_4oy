
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { MachineDriver } from "../../machine_driver/model/machine_driver.model";
import { Machine } from "../../machine/model/machine.model";

interface IDriverCreationAttr{
    first_name: string;
    last_name: string;
    phone: string;
    driver_license: string;
}

@Table({ tableName: 'driver'})
export class Driver extends Model<Driver, IDriverCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    declare first_name: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    declare last_name: string;

    @Column({
        type: DataType.STRING(20),
        unique: true,
        
    })
    declare phone: string;

    @Column({
        type: DataType.STRING(50),
        unique: true,
    })
    declare driver_license: string;


    // @HasMany(() => MachineDriver)
    // machineDriver: MachineDriver[];


    @BelongsToMany(() => Machine, () => MachineDriver)
    machines: Machine[];
}
