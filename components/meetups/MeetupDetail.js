import classes from './MeetupDetail.module.css'
function MeetupDetail(props) {
  return (
    <section class={classes.detail}>
      <img
        src={props.image}
        alt={props.title}
      />
      <h1>{props.heading}</h1>
      <address>{props.address}</address>
      <p>
        {props.description}
      </p>
    </section>
  );
}

export default MeetupDetail;
