require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
