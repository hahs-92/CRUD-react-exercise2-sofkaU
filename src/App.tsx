import 'bootstrap/dist/css/bootstrap.css';
import { v4 as uuidv4 } from 'uuid';
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

const newCharacterInit = {id:"", character:"", anime:""}

function App() {
  const [characters,setCharacters] = useState<Character[]>(initialData)
  const [newCharacter, setNewCharacter] = useState<Character>(newCharacterInit)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(false)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNewCharacter({
      ...newCharacter,
      [e.target.name]: e.target.value
    })
  }

  const addNewCharacter = () => {
    //validacion de campos
    if(!newCharacter.character || !newCharacter.anime) return false

    newCharacter.id = uuidv4()
    setCharacters(characters.concat(newCharacter))
    setModalOpen(false)
    setNewCharacter(newCharacterInit)
    setEditing(false)
  }

  const editCharacter = (id: string) => {
    setNewCharacter(characters.filter(c => c.id === id)[0])
    setEditing(true)
    setModalOpen(true)
  }

  const updateCharacter = () => {
    //validacion de campos
    if(!newCharacter.character || !newCharacter.anime) return false

    setCharacters(characters.map(c => c.id === newCharacter.id ? newCharacter : c))
    setNewCharacter(newCharacterInit)
    setModalOpen(false)
    setEditing(false)
  }

  const controller = () => {
    (editing) ? updateCharacter() : addNewCharacter()
  }

  const cancelModal = () => {
    setModalOpen(false)
    setEditing(false)
    setNewCharacter(newCharacterInit)
  }

  const deleteCharacter = (id: string) => {
    const confirm = window.confirm("Esta seguro de eliminar este registro?")
    if(confirm) setCharacters(characters.filter(c => c.id !== id))
  }

  return (
    <>
      <Container className='mt-5'>
        <Button
          color='success'
          onClick={() => setModalOpen(true)}
        >Add new Character
        </Button>

        <br />

        <Table className='mt-3'>
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
                    <Button color='primary' onClick={() => editCharacter(character.id )}>Edit</Button>
                    <span>  </span>
                    <Button color='danger' onClick={() => deleteCharacter(character.id )}>Delete</Button>
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
            <h3>{ editing ? "Edit Character" : "Add New Character"}</h3>
          </div>
        </ModalHeader>

        <ModalBody>
         {
           editing &&
            <FormGroup>
              <label htmlFor="id">Id</label>
              <input
                id="id"
                className='form-control'
                type="text"
                value={newCharacter.id}
                onChange={handleChange}
              />
            </FormGroup>
         }

          <FormGroup>
            <label htmlFor="character">Character:</label>
            <input
              id="character"
              name='character'
              className='form-control'
              type="text"
              value={newCharacter.character}
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
              value={newCharacter.anime}
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color='primary' onClick={ controller}>{!editing ? "Add" : "Edit"}</Button>
          <Button color='danger' onClick={cancelModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default App;
