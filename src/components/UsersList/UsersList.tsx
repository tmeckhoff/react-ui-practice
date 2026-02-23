import { useEffect, useMemo, useState } from "react";
import { User } from "../../types/User";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonResponse) => {
        setUsers(jsonResponse);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();

    if (!term) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term) ||
        user.address.city.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.website.toLowerCase().includes(term),
    );
  }, [users, searchTerm]);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Users</h1>

      <div>
        <p>Search</p>
        <input
          value={searchTerm}
          style={{ border: "1px solid black" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm("")}>Reset Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isLoading && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>City</th>
              <th>Company Name</th>
              <th>Company Catch Phrase</th>
              <th>Phone Number</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.address.city}</td>
                <td>{user.company.name}</td>
                <td>{user.company.catchPhrase}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
