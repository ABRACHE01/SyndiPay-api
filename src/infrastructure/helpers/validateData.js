const path = require("path");
const fs = require("fs");

const validateData = (data, schemaName) => {
  const schemaPath = path.join(
    __dirname,
    "..",
    "packages",
    "validation",
    `${schemaName}Schema.js`
  );

  try {
    if (!fs.existsSync(schemaPath)) {
      return {
        error: {
          status: 404,
          message: `Schema "${schemaName}" does not exist`,
        },
      };
    }

    const schema = require(schemaPath);
    const { error } = schema.validate(data);

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return {
        error: {
          status: 400,
          message: errorMessages[0],
        },
      };
    }

    return {
      error: null,
    };
  } catch (error) {
    return {
      error: {
        status: 500,
        message: `Error validating data against schema "${schemaName}": ${error.message}`,
      },
    };
  }
};

module.exports = validateData;
