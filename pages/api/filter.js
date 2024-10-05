import knex from "../../clients/knex";

export default async (req, res) => {
  if (req.method === "POST") {
    const palettes = await knex("palettes")
      .where('title', 'like', `%${req.body.filter}%`);
    const cleanPalettes = palettes.reduce((allPalettes, palette) => {
      allPalettes.push({
        id: palette.id,
        palette: JSON.parse(palette.palette),
        title: palette.title,
      });
      return allPalettes;
    }, []);
    res.status(200).json(cleanPalettes);
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};
