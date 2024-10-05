import knex from "../../clients/knex";

export default async (req, res) => {
  if (req.method === "GET") {
    const palettes = await knex("palettes").select();

    const cleanPalettes = palettes.reduce((allPalettes, palette) => {
      allPalettes.push({
        id: palette.id,
        palette: JSON.parse(palette.palette),
        title: palette.title,
      });
      return allPalettes;
    }, []);
    res.status(200).json(cleanPalettes);
  } else if (req.method === "POST") {
    const [id] = await knex("palettes")
      .insert({
        palette: JSON.stringify(req.body.colors),
        title: req.body.title,
      });

      const [palette] = await knex("palettes")
      .where({ id: id });

      const cleanPalette = {
        id: palette.id,
        palette: JSON.parse(palette.palette),
        title: palette.title,
      };

    res.status(200).json(cleanPalette);
  } else if (req.method === "PUT") {
    await knex("palettes")
      .where({ id: req.body.id })
      .update({ palette: JSON.stringify(req.body.palette) });

    const [palette] = await knex("palettes")
      .where({ id: req.body.id })

      const cleanPalette = {
        id: palette.id,
        palette: JSON.parse(palette.palette),
        title: palette.title,
      };
    res.status(200).json(cleanPalette);
  } else if (req.method === "DELETE") {
    await knex("palettes")
      .where({ id: req.body.id })
      .del();

      res.status(200).json(req.body.id);
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  };
};
