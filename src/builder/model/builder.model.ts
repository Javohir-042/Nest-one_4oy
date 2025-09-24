
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company } from "../../company/models/company.models";

interface IBuilderCreationAttr {
    full_name: string
    birth_day: Date;
    salary: number;
    companyId: number
}

@Table({ tableName: "builder" })
export class Builder extends Model<Builder, IBuilderCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: false
    })
    declare full_name: string;

    @Column({
        type: DataType.DATEONLY,
    })
    declare birth_day: Date;

    @Column({
        type: DataType.DECIMAL(15,2),
        allowNull: false,
    })
    declare salary: number;

    @ForeignKey(()=>Company)
    @Column({
        type: DataType.INTEGER, 
        onDelete: "CASCADE"
    })
    declare companyId: number;

    @BelongsTo(()=>Company)
    company: Company;
}

