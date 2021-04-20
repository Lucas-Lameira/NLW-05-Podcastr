export default function Home(props) {
  return (
    <div>     
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}


//next knows that this function should be handle
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();
  return{
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8 //time in seconds      
  }
}
