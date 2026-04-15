import mysql from 'mysql2/promise';

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {

    const { fullName, email, phone, otherNames, broker } = req.body;

   const db = await mysql.createConnection({
  uri: process.env.DATABASE_URL
});

    await db.execute(
      `INSERT INTO users (full_name, email, phone, other_names, broker)
       VALUES (?, ?, ?, ?, ?)`,
      [fullName, email, phone, otherNames, broker]
    );

    await db.end();

    return res.status(200).json({ message: 'Saved successfully' });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
