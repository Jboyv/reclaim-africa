import mysql from 'mysql2/promise';

const db = mysql.createPool(process.env.DATABASE_URL);

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {

    const { fullName, email, phone, otherNames, broker } = req.body;

    await db.execute(
      `INSERT INTO users (full_name, email, phone, other_names, broker)
       VALUES (?, ?, ?, ?, ?)`,
      [fullName, email, phone, otherNames, broker]
    );

    return res.status(200).json({ message: 'Saved successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
