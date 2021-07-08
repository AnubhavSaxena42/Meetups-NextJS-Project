import { MongoClient } from "mongodb";
//api/new-meetup
//POST
async function handler(req, res) {
  console.log('in handler')
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://Anubhav:Anubhav123@cluster0.purnc.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    console.log(client)
    const db = client.db('meetups');
    const meetupsCollection = db.collection("meetups");
    console.log('meetupsCollection')
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup Inserted" });
  }
}

export default handler;
