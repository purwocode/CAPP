// /pages/api/ip-check.js
export default async function handler(req, res) {
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({ error: "IP address is required" });
  }

  try {
    const botakRes = await fetch(
      `https://cihuy-lovat.vercel.app/api/ip-checker?ip=${ip}`,
      {
        method: "GET",
        headers: {
          "accept": "application/json",
          "accept-language": "en-US,en;q=0.9,id;q=0.8",
        },
      }
    );

    if (!botakRes.ok) {
      throw new Error(`Botak response not OK: ${botakRes.status}`);
    }

    const data = await botakRes.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("IP check failed:", error);
    return res
      .status(500)
      .json({ error: "Failed to check IP", isBlocked: false });
  }
}
