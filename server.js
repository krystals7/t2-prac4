const express = require("express");
const mongoose = require('mongoose');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================== MongoDB Connection ======================
mongoose.connect('mongodb://127.0.0.1:27017/myprojectDB')
    .then(() => {
        console.log('✅ Connected to MongoDB!');
        seedProjects();           // ← Seed only AFTER successful connection
    })
    .catch(err => {
        console.error('❌ MongoDB connection failed:', err);
    });

// ====================== Schema & Model ======================
const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

// ====================== Seed Data ======================
async function seedProjects() {
    try {
        await Project.deleteMany({});   // Clear old data
        console.log("🗑️ Cleared existing projects");

        const projects = [
            {
                title: "Kitten 2",
                image: "images/kitten-2.jpg",
                link: "About Kitten 2",
                description: "Demo description about kitten 2"
            },
            {
                title: "Kitten 3",
                image: "images/kitten-3.jpg",
                link: "About Kitten 3",
                description: "Demo description about kitten 3"
            }
        ];

        await Project.insertMany(projects);
        console.log("✅ Successfully seeded 2 projects into MongoDB!");
        
    } catch (error) {
        console.error("❌ Seeding error:", error.message);
    }
}

// ====================== Routes ======================
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json({
            statusCode: 200,
            data: projects,
            message: "Success"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: "Server error" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});


  