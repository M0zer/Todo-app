import './App.css';
import TodoList from './components/TodoList';
import UserTabs from './components/UserTabs';
import { TodoProvider } from './components/TodoContext';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';

import type { User } from './models/user';
import { useState } from 'react';

const App = () => {
	const [users, setUsers] = useState<User[]>([
		{ id: 'anna', name: 'Anna', Tasks: [], editable: false },
		{ id: 'bela', name: 'Béla', Tasks: [], editable: false },
		{ id: 'mari', name: 'Mari', Tasks: [], editable: false },
	]);

	return (
		<Router>
			<TodoProvider>
				<Routes>
					<Route
						path="/todos/:userId"
						element={
							<div className="parent-container">
								<h1>Todo list</h1>
								<UserTabs users={users} />
								<TodoList />
							</div>
						}
					/>
					<Route
						path="/"
						element={
							users.length > 0 ? (
								<Navigate to={`/todos/${users[0].id}`} />
							) : (
								<div>Nem található felhasználó.</div>
							)
						}
					/>
				</Routes>
			</TodoProvider>
		</Router>
	);
};

export default App;
