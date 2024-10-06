const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require("express");
const connectDB = require('./db/connectDB');
const cors = require('cors');
const port = process.env.PORT || 9000
const app = express();
app.use(express.json());
app.use(cors());

const GalleryRoutes = require('./routes/GalleryRoute');
const ContactUsRoutes = require('./routes/ContactusRoute.js')
app.use('/api/galleries', GalleryRoutes);
app.use('/api/contactus', ContactUsRoutes);

app.get("/test", (req, res) => {
    return res.status(200).json({ success: true, message: "Test successful. Server is successfully running!" })
  })

  const start = async () => {
    try {
      await connectDB(process.env.MONGODB_URL);
      app.listen(port, () =>
        console.log(`Server is running on port ${port}`)
      );
    } catch (error) {
      console.log(error)
    }
  };
  
  start();