const {
  body,
  validationResult,
} = require("express-validator");

exports.validateMark = [

  body("marksObtained")
    .isInt({ min: 0, max: 100 })
    .withMessage(
      "Marks must be between 0 and 100"
    ),

  (req, res, next) => {

    const errors =
      validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({
        errors: errors.array(),
      });

    }

    next();

  },
];

exports.validateStudent = [

  body("name")
    .notEmpty()
    .withMessage(
      "Name is required"
    ),

  body("email")
    .isEmail()
    .withMessage(
      "Valid email required"
    ),

  body("branch")
    .notEmpty()
    .withMessage(
      "Branch required"
    ),

  body("year")
    .isInt({
      min:1,
      max:4
    })
    .withMessage(
      "Year must be 1-4"
    ),

  (req,res,next)=>{

    const errors =
      validationResult(req);

    if(!errors.isEmpty()){

      return res.status(400).json({
        errors:errors.array()
      });

    }

    next();

  }
];