import Style from './Style.css';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { ButtonToggle } from "reactstrap";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import React, { useState } from 'react';
import axios from 'axios';
import {AiOutlineIdcard, AiOutlineEnvironment, AiOutlineShareAlt} from 'react-icons/ai';

function App(props) {
  const [ username, setUsuario ] = useState('')
  const [ user , setUser] = useState({
    avatar_url: '',
    name: '',
    bio: '',
    location: '',
    followers: '',
    following: '',
    public_repos: '',
    html_url: ''
  })

  function handlePesquisa(){
    axios.get(`https://api.github.com/users/${username}`)
    .then(res => {
      setUser(res.data)
    });
  }

  return (
    <div>
      <Card id="card">
        <CardBody>
          <p class="title">Consulta ao Perfil GitHub</p>
          <InputGroup id="input">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <Input placeholder="username" value={username} onChange={e => setUsuario(e.target.value)}/>
            <ButtonToggle color="secondary" onClick={ handlePesquisa }>Search</ButtonToggle>
          </InputGroup>
          <CardImg id="avatar" src={user['avatar_url']} alt="avatar" />
          <h4>{user['name']}</h4>
          <CardText>
            <br/>      
            <p><AiOutlineIdcard /> {user['bio']}</p>
            <p><AiOutlineEnvironment /> {user['location']}</p>
            <p><AiOutlineShareAlt /> {user['public_repos']}&nbsp;Repositories</p>
            <p><b>Followers:</b> {user['followers']}&nbsp;&nbsp;&nbsp;&nbsp;<b>Following:</b> {user['following']}</p>
            <Button outline color="primary" href={user['html_url']} target="_blank" id="go">Go to profile</Button>{' '}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
