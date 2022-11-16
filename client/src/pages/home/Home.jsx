import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"

const Home = () => {
  return (
    <main className="home">
      <Share/>
      <Posts/>
    </main>
  )
}

export default Home