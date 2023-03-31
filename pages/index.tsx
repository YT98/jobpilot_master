import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <div>Home</div>
      <ul>
        <li>
          <Link href="/signin">
            Sign In
          </Link>
        </li>
        <li>
          <Link href="/signup">
            Sign Up
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
