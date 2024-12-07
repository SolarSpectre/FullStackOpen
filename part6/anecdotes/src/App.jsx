import AnecdoteForm from "./components/AnecdotesForm"
import AnecdotesList from "./components/AnecdotesList"
import Filter from "./components/Filter"

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  )
}

export default App