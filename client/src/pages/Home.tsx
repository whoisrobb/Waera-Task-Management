import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
        <Link to={'/login'}>login</Link>
        <Link to={'/register'}>register</Link>
    </div>
  )
}

export default Home