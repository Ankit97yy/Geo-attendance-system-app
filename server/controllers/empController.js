const { DateTime } = require("luxon");
const db = require("../database");
const { getDateTime } = require("../dateTimeFunctions");

async function getEmployees(req, res) {
  try {
    const [result] = await db.execute(
      "SELECT employees.id,branch_location_id,full_name,profile_picture,email,is_admin,branch_locations.location_name FROM employees JOIN branch_locations ON employees.branch_location_id=branch_locations.id"
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function getEmployee(req, res) {
  try {
    const emp_id = req.params.id;
    const [result] = await db.execute(
      "SELECT employees.id,branch_location_id,full_name,email,profile_picture,branch_locations.location_name FROM employees JOIN branch_locations ON employees.branch_location_id=branch_locations.id WHERE employees.id= ?",
      [emp_id]
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}
async function getLoggedInEmployee(req, res) {
  try {
    const emp_id = req.id;
    const [result] = await db.execute(
      "SELECT employees.id,full_name,location_name,latitude,longitude,profile_picture FROM employees JOIN branch_locations ON employees.branch_location_id=branch_locations.id WHERE employees.id= ?",
      [emp_id]
    );
    res.send({
      id:result[0].id,
      name: result[0].full_name,
      location_name: result[0].location_name,
      latitude: result[0].latitude,
      longitude: result[0].longitude,
      profile_picture:result[0].profile_picture
    });
  } catch (error) {
    console.log(error);
  }
}

async function addEmployee(req, res) {
  try {
    const [email] = await db.execute("SELECT * FROM employees WHERE email=?", [
      req.body.email,
    ]);
    if (email.length > 0) {
      res.send("employee exist");
    } else {
      const { createHash} = require("../hashFunction");
      const hash = await createHash(req.body.password);
      const values = [
        req.body.branch_location_id,
        req.body.full_name,
        req.body.email,
        hash,
        req.body.is_admin,
        req.id,
        req.file.originalname,
      ];

      const [result] = await db.execute(
        "INSERT INTO employees(branch_location_id,full_name,email,password,is_admin,created_user,profile_picture,created_time) VALUES (?,?,?,?,?,?,?,?)",
        [...values, getDateTime()]
      );
      const [total_leaves]= await db.execute("SELECT * FROM total_leaves")
      await db.execute(
        "INSERT INTO remaining_leaves (emp_id,annual,sick,casual) VALUES (?,?,?,?)",
        [result.insertId, total_leaves[0].annual, total_leaves[0].sick, total_leaves[0].casual]
      );
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteEmployee(req, res) {
  try {
    //! first check whether employee is an admin
    const emp_id = req.params.id;
    const [checkAdmin] = await db.execute(
      'SELECT id FROM employees WHERE is_admin="yes"'
    );
    if(checkAdmin.length===1){
      if(checkAdmin[0].id===emp_id) return res.status(403).json({ message: "can not delete the only admin" });
    }
    const [result] = await db.execute("DELETE FROM employees WHERE id=?", [
      emp_id,
    ]);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const attributes = req.body;
    delete attributes.location_name;
    const key = Object.keys(attributes);
    const value = Object.values(attributes);

    if (key[0] === "is_admin" && value[0] === "no") {
    if(id===req.id.toString()) return res.status(403).send("can not remove yourself from admin")
      const [checkAdmin] = await db.execute(
        'SELECT id FROM employees WHERE is_admin="yes"'
      );
      // const is_admin = Boolean(checkAdmin.find((item) => item.id.toString() === emp_id));
      if (checkAdmin.length === 1)
        return res
          .status(403)
          .json({ message: "can not delete the only admin" });
    }
    const placeholders = `${key[0]}="${
      value[0]
    }", updated_time="${getDateTime()}"`;
    const [result] = await db.execute(
      `UPDATE employees SET ${placeholders} WHERE id=${id}`
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function profilePicture(req, res) {
  console.log(
    "🚀 ~ file: empController.js:120 ~ profilePicture ~ req:",
    req.file
  );
}
async function changeEmail(req, res) {
  try {
    const { old_email, new_email } = req.body;
    const [result] = await db.execute(
      "SELECT email FROM employees WHERE id=? AND email=?",
      [req.id, old_email]
    );
    if (result.length === 0)
      return res.status(403).send("old email is incorrect");
    await db.execute("UPDATE employees set email=? WHERE id=?", [
      new_email,
      req.id,
    ]);
    res.sendStatus(200);
  } catch (error) {
    console.log(
      "🚀 ~ file: empController.js:154 ~ changeEmail ~ error:",
      error
    );
  }
}
async function changePassword(req, res) {
  try {
    const { createHash, verifyHash } = require("../hashFunction.js");
    const { old_password, new_password } = req.body;
    const [result] = await db.execute(
      "SELECT password FROM employees WHERE id=?",
      [req.id]
    );
    const isVerified = await verifyHash(result[0].password, old_password);
    if (!isVerified) return res.staus(403).status("incorrect old password");
    const hash = await createHash(new_password);
    await db.execute("UPDATE employees set password=? WHERE id=?", [
      hash,
      req.id,
    ]);
    res.sendStatus(200);
  } catch (error) {
    console.log(
      "🚀 ~ file: empController.js:172 ~ changePassword ~ error:",
      error
    );
  }
}

async function savePushToken(req,res){
  try {
    const {push_token}=req.body;
    await db.execute("UPDATE employees SET push_token=? WHERE id=?",[push_token,req.id])
    res.sendStatus(200)
  } catch (error) {
    console.log("🚀 ~ file: empController.js:187 ~ savePushToken ~ error:", error)
    
  }
}

async function generateReport(req, res) {
  const { start, end, id } = req.body;
  console.log("🚀 ~ file: empController.js:142 ~ generateReport ~ id:", id);
  var result = [];
  if (id === undefined) {
    [result] = await db.execute(
      "SELECT attendance.id,location_name,date,full_name,status,in_time,out_time,late_arrival,early_departure FROM attendance JOIN employees ON attendance.emp_id=employees.id JOIN branch_locations on employees.branch_location_id=branch_locations.id WHERE date between ? AND ? ORDER BY attendance.date DESC",
      [start, end]
    );
  } else {
    [result] = await db.execute(
      "SELECT attendance.id,location_name,date,full_name,status,in_time,out_time,late_arrival,early_departure FROM attendance JOIN employees ON attendance.emp_id=employees.id JOIN branch_locations on employees.branch_location_id=branch_locations.id WHERE employees.id = ? AND date between ? AND ? ORDER BY attendance.date DESC",
      [id, start, end]
    );
  }

  var fonts = {
    Roboto: {
      normal: "assets/fonts/roboto/Roboto-Regular.ttf",
      bold: "assets/fonts/roboto/Roboto-Medium.ttf",
      italics: "assets/fonts/roboto/Roboto-Italic.ttf",
      bolditalics: "assets/fonts/roboto/Roboto-MediumItalic.ttf",
    },
  };

  var PdfPrinter = require("pdfmake");
  var printer = new PdfPrinter(fonts);
  const data = [
    {
      name: "John",
      location: "New York",
      status: "Present",
      in_time: "08:00 AM",
      out_time: "05:00 PM",
      late_arrival: "No",
      early_departure: "No",
      date: "2022-05-01",
    },
    {
      name: "Jane",
      location: "London",
      status: "Present",
      in_time: "09:00 AM",
      out_time: "06:00 PM",
      late_arrival: "Yes",
      early_departure: "No",
      date: "2022-05-01",
    },
  ]; // add more mock data here];

  const tableHeaders = [
    "Name",
    "Location",
    "Status",
    "In Time",
    "Out Time",
    "Late Arrival",
    "Early Departure",
    "Date",
  ];
  const tableWidths = [
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
    "auto",
  ];

  // define table body
  const tableBody = [tableHeaders];

  result.forEach((row) => {
    const rowData = [];
    rowData.push(row.full_name);
    rowData.push(row.location_name);
    rowData.push(row.status);
    rowData.push(row.in_time);
    rowData.push(row.out_time);
    rowData.push(row.late_arrival);
    rowData.push(row.early_departure);
    rowData.push(
      DateTime.fromJSDate(row.date)
        .setZone("Asia/Kolkata")
        .toFormat("dd-MM-yyyy")
    );
    tableBody.push(rowData);
  });
  // console.log("🚀 ~ file: empController.js:171 ~ data.forEach ~ tableBody:", tableBody)
  console.log("*******");

  var docDefinition = {
    content: [
      {
        text: "Attendance Report",
        style: "header",
      },
      {
        text: "Date: May 2022",
        style: "subheader",
      },
      {
        style: "table",
        table: {
          headerRows: 1,
          widths: tableWidths,
          body: tableBody,
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      table: {
        margin: [0, 5, 0, 15],
      },
    },
  };

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=hello.pdf");
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.end();
  pdfDoc.pipe(res);
}

module.exports = {
  getEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployees,
  addEmployee,
  getLoggedInEmployee,
  profilePicture,
  generateReport,
  changeEmail,
  changePassword,
  savePushToken
};
