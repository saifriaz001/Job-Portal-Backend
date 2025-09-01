import { DataTypes } from "sequelize";
import { sequelize } from "../DB/connection.js";
import Job from "../models/Jobs.js";

const Application = sequelize.define(
  "Application",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    applicantName: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },

    // ✅ Resume stored as URL
    resume: { type: DataTypes.STRING, allowNull: false },


    // ✅ Education stored as JSON string in DB
    education: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const raw = this.getDataValue("education");
        return raw ? JSON.parse(raw) : [];
      },
      set(val) {
        this.setDataValue("education", JSON.stringify(val || []));
      },
    },

    // ✅ Experience stored as JSON string in DB
    experience: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const raw = this.getDataValue("experience");
        return raw ? JSON.parse(raw) : [];
      },
      set(val) {
        this.setDataValue("experience", JSON.stringify(val || []));
      },
    },
  },
  { tableName: "applications", timestamps: true }
);

// Associations
Job.hasMany(Application, { foreignKey: "jobId", onDelete: "CASCADE" });
Application.belongsTo(Job, { foreignKey: "jobId" });

export default Application;
