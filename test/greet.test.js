// Test route to select data from the 'greetings' table
app.get('/test', async (req, res) => {
    try {
      // Replace 'greetings' with the name of your table
      const result = await db.any('SELECT * FROM greeting_counts');
      res.json(result);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Failed to retrieve data from the database.' });
    }
  });