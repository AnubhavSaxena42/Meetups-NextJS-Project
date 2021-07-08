import {MongoClient,ObjectId} from 'mongodb'
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from 'next/head'
import {Fragment} from 'react'
function MeetupDetails(props) {
    
  return <Fragment>
      <Head>
          <title>{props.meetupData.title}</title>
          <meta name="description" content={props.meetupData.description}/>
      </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
      />
    
      </Fragment>
    }
    export async function getStaticPaths(){
        const client = await MongoClient.connect(
            "mongodb+srv://Anubhav:Anubhav123@cluster0.purnc.mongodb.net/meetups?retryWrites=true&w=majority"
          );
          console.log(client)
          const db = client.db('meetups');
          const meetupsCollection = db.collection("meetups");
          const meetups = await meetupsCollection.find({},{_id:1}).toArray()
          client.close();
        return {
            fallback:'blocking',
            paths:meetups.map(meetup=>({
                params:{
                    meetupId:meetup._id.toString()
                }
            }))
        }
    }


export async function getStaticProps(context){
    const meetupId = context.params.meetupId
    console.log(meetupId)
    const client = await MongoClient.connect(
        "mongodb+srv://Anubhav:Anubhav123@cluster0.purnc.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      console.log(client)
      const db = client.db('meetups');
      const meetupsCollection = db.collection("meetups");
      const meetup = await meetupsCollection.findOne({_id:ObjectId(meetupId)});
      client.close();
    return {
        props:{
            meetupData:{
                id:meetup._id.toString(),
                title:meetup.title,
                image:meetup.image,
                address:meetup.address,
                description:meetup.description
            },
        },
    }
}
export default MeetupDetails;
