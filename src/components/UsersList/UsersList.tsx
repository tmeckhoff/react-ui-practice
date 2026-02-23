import { useEffect, useMemo, useState } from "react";
import { User } from "../../types/User";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("fetching users...");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((jsonResponse) => {
        setUsers(jsonResponse);
        setFilteredUsers(jsonResponse);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());

    console.log("filtering users...");
    const filteredUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm) ||
        user.address.city.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.website.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredUsers(filteredUsers);
  };

  const onClick = () => {
    setFilteredUsers(users);
    setSearchTerm("");
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Users</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <input
          value={searchTerm}
          id="search-input"
          style={{ border: "1px solid black" }}
          onChange={onChange}
        />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!isLoading && (
        <table>
          <thead>
            <th>Name</th>
            <th>Username</th>
            <th>City</th>
            <th>Company Name</th>
            <th>Company Catch Phrase</th>
            <th>Phone Number</th>
            <th>Website</th>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.address.city}</td>
                  <td>{user.company.name}</td>
                  <td>{user.company.catchPhrase}</td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}
