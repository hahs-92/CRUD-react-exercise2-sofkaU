import 'bootstrap/dist/css/bootstrap.css';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup
} from 'reactstrap'
//data dummty
import { initialData } from './data/initialData'
import { useState } from 'react';

function App() {
  const [characters,setCharacters] = useState<Character[]>(initialData)

  return (
    <div className="App">
      <Container>
        <Button color='success' >Add new Character</Button>

        <br />

        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Character</th>
              <th>Anime</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              characters.map(character => (
                <tr key={character.id }>
                  <td>{character.id}</td>
                  <td>{character.character}</td>
                  <td>{character.anime}</td>

                  <td>
                    <Button color='primary'>Edit</Button>
                    <span>  </span>
                    <Button color='danger'>Delete</Button>
                  </td>
                </tr>
              ))
            }
          </tbody>




        </Table>
      </Container>
    </div>
  );
}

export default App;
