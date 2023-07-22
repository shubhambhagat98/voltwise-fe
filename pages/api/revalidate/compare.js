import { formatDateInEasternTime } from "@/utils/FrequencyAndTime";

export default async function handler(req, res) {
  // // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_BASE_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/compare");
    return res.json({
      revalidated: true,
      time: formatDateInEasternTime(new Date()),
      page: "compare page",
    });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err);
    return res.status(500).send("Error revalidating");
  }
}
