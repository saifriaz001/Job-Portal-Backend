// models/Job.js
import { DataTypes } from "sequelize";
import { sequelize } from "../DB/connection.js";

const Job = sequelize.define(
    "Job",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        company: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },


        requirements: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const raw = this.getDataValue("requirements");
                return raw ? JSON.parse(raw) : [];
            },
            set(val) {
                this.setDataValue("requirements", JSON.stringify(val || []));
            },
        },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { tableName: "jobs", timestamps: true }
);

export default Job;

