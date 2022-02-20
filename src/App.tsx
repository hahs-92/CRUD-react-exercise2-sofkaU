import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
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

function App() {
  const [characters,setCharacters] = useState<Character[]>(initialData)
  const [newCharacter, setNewCharacter] = useState<Character>({id:"", character:"", anime:""})
  const [modalOpen, setModalOpen] = useState(false)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNewCharacter({
      ...newCharacter,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="App">
      <Container>
        <Button
          color='success'
          onClick={() => setModalOpen(true)}
        >Add new Character
        </Button>

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

      <Modal isOpen={ modalOpen}>
        <ModalHeader >
          <div>
            <h3>Add Character</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label htmlFor="id">Id</label>
            <input
              id="id"
              className='form-control'
              type="text"
              value={characters.length + 1}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="character">Character:</label>
            <input
              id="character"
              name='character'
              className='form-control'
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="anime">Anime:</label>
            <input
              id="anime"
              name='anime'
              className='form-control'
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color='primary'>Add</Button>
          <Button color='danger' onClick={() => setModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
