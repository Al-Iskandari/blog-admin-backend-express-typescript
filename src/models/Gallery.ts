import { DataType,DataTypes,Model,Optional } from "sequelize";
import connection from "../config/dbConnect";

interface GalleryAttributes{
    id?: number,
    userId?: number,
    category?: number,
    title?: string | null,
    description?: string | null,
    image?: string | null,

    createdAt?: Date | null,
    updatedAt?: Date | null,
}

export interface GalleryInput extends Optional<GalleryAttributes, 'id'>{ }
export interface GalleryOutput extends Required<GalleryAttributes>{ }

class Gallery extends Model<GalleryAttributes, GalleryInput> implements GalleryAttributes {
    public id!: number;
    public userId!: number;
    public category!: number;
    public title!: string | null;
    public description!: string | null;
    public image!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Gallery.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        allowNull: false,
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    timestamps: true,
    sequelize: connection,
    tableName: 'Galleries',
    underscored: false,
});

export default Gallery;