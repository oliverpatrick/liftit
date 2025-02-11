import { Link } from 'react-router';

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 flex h-12 w-screen justify-around border-t bg-green-500 py-2 shadow-md">
      <Link to="/" className="text-center text-gray-700 hover:text-blue-500">
        Home
      </Link>
      <Link
        to="/profile"
        className="text-center text-gray-700 hover:text-blue-500"
      >
        Profile
      </Link>
    </nav>
  );
};
