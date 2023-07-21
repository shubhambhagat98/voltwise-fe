export default async function handler(req, res) {
  // // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_BASE_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/plot");
    return res.json({
      revalidated: true,
      time: new Date().toLocaleTimeString(),
      page: "plot page",
    });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err);
    return res.status(500).send("Error revalidating");
  }
}
