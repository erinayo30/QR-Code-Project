import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// import qr from qr-image
inquirer
  .prompt([
    {
      type: "input",
      message: "Type in your URL",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    const qr_svg = qr.image(url, { type: "png" });
    qr_svg.pipe(fs.createWriteStream("qr_image.png")).on("finish", () => {
      console.log("QR code image has been saved as qr_image.png");
    });

    const message = `The url you provide is ${url}`;
    fs.writeFile("messgae.txt", message, (err) => {
      if (err) throw err;
      console.log("The file has been saved");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      // Something else went wrong
      console.error("An error occurred:", error);
    }
  });
