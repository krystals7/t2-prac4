// Temporary script to seed data (run once)
async function seedData() {
    await Project.deleteMany({}); // Clear existing data
    
    await Project.create([
        {
            title: "Book 2",
            image: "images/book2.jpg",
            link: "About Book 2",
            description: "Demo description about Book 2"
        },
        {
            title: "Book 3",
            image: "images/book3.jpg",
            link: "About Book 3",
            description: "Demo description about Book 3"
        }
    ]);
    console.log("Data seeded!");
}

seedData();

// ====================== Seed Data (Run Once) ======================
async function seedProjects() {
    try {
        // Optional: Clear old data first
        await Project.deleteMany({});
        console.log(" Cleared existing projects");

        const projects = [
            {
                title: "Book 2",
                image: "images/book2.jpg",
                link: "About Book 2",
                description: "Demo description about Book 2"
            },
            {
                title: "Book 3",
                image: "images/book3.jpg",
                link: "About Book 3",
                description: "Demo description about Book 3"
            }
        ];

        await Project.insertMany(projects);
        console.log(" Successfully seeded 2 projects into MongoDB!");
    } catch (error) {
        console.error("❌ Seeding error:", error);
    }
}

// Run seeding when server starts (only the first time)
seedProjects();

app.post('/api/seed', async (req, res) => {
    try {
        await Project.deleteMany({});
        await Project.insertMany([ /* same array as above */ ]);
        res.send("Data seeded successfully!");
    } catch (e) {
        res.status(500).send("Seeding failed");
    }
});

 
