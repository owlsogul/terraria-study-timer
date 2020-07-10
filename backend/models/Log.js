module.exports = function(sequelize, DataTypes){
    let model = sequelize.define("Log", {
        logId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        logType: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        startedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        endedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        underscored: true,
        freezeTableName: true
    });
    model.associate = function(models){
        
    }    
    return model;
  }
  
  