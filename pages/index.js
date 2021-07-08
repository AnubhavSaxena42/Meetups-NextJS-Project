import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/77/Sign_outside_Malana%2C_Himachal_Pradesh.jpg",
    address: "Malana,Himachal Pradesh",
    description: "I need to escape",
  },
  {
    id: "m2",
    title: "Second Meetup",
    image:
      "https://static.toiimg.com/photo/msid-78201919,width-96,height-65.cms",
    address: "Kinnaur,Himachal Pradesh",
    description: "I need to escape",
  },
];
function Homepage(props) {
  return <Fragment>
    <Head>
      <title>NextJS Meetups</title>
    </Head>
    <MeetupList meetups={props.meetups} />;
  </Fragment>;
}
export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://Anubhav:Anubhav123@cluster0.purnc.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  console.log(client);
  const db = client.db("meetups");
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

/*export async function getServerSideProps(context) {
  //fetch data from an API
  const req = context.req;
  const res = context.res;
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
} */
export default Homepage;
