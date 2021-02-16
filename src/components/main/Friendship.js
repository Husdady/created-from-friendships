import React, { useState, useEffect } from 'react';
import './css/styles.css';

/* Components */
import AddFriendship from './AddFriendship';
import DeleteFriendship from './DeleteFriendship';
import ListFriendships from './ListFriendships';
import Modal from './Modal';

/* JSON */
import friendships from '../json/friendships';

/* Librarys */
import message from '../assets/message';

const Friendship = () => {

  const [mq, setMq] = useState('');

  const mediaQueries = () => {
    if (window.innerWidth > 600) {
      setMq(true);
    } else {
      setMq(false);
    }
  }

  useEffect(() => {
    mediaQueries();
    window.addEventListener('resize', () => mediaQueries());
  }, []);

  const deleteHistory = () => {
    if (deletePerson.length > 0) {
      message(
        false,
        '',
        'deleteHistory',
        'El historial ha sido borrado con éxito&nbsp;&nbsp;&nbsp;<i id="check" class="fas fa-check-circle"></i>'
      );
      setDeletePerson([]);
    } else {
      message(
        false,
        '',
        'deleteHistory',
        'Error ! El historial está vacío&nbsp;&nbsp;&nbsp;<i id="danger" class="fas fa-times-circle"></i>'
      );
    }
  }

  const [person, setPerson] = useState(friendships),
    [deletePerson, setDeletePerson] = useState([]),
    [showModal, setShowModal] = useState({
      condition: false,
      index: 0
    });

  const deleteCardPerson = (x, index) => {
    const newState = x.filter((e, i) => {
      return i !== index;
    });
    setPerson(newState);
  }

  const showFriendsDelete = x => {
    const y = deletePerson.find(z => z.nombre === x.nombreDeUsuario);
    if (!y) {
      const newDate = new Date();
      let date = `${newDate.getDate()}/${newDate.getMonth() + 1 < 10 ? '0' : null}${newDate.getMonth() + 1}/${newDate.getFullYear()}`,
        hour = `${newDate.getHours()}:${newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes()}`;
      const friends = {
        nombre: x.nombreDeUsuario,
        apellidos: x.apellidosDeUsuario,
        imagen: x.imagenUsuario,
        date: date,
        hour: hour
      }
      let friendsDelete = [...deletePerson, friends];
      setDeletePerson(friendsDelete);
    };
  }

  const addNewFriend = newFriend => {
    setPerson([...person, newFriend]);
  }

  const changeUserImg = (img, index) => {
    let newArr = [...person];
    newArr[index].imagenUsuario = img;
    setPerson(newArr);
  }

  const changeBackgroundImg = (img, index) => {
    let newArr = [...person];
    newArr[index].fondoImagen = img;
    setPerson(newArr);
  }

  return (

    <div id="container">

      { showModal.condition === true
        ? <Modal
          objectJson={person}
          onClick={() => setShowModal({
            ...showModal,
            condition: false
          })}
          i={showModal.index}
        />
        : null
      }

      <section id="add-friendship">
        <h3>Agrega a alguien nuevo(a) a tu lista de amigos(as) :</h3>
        <AddFriendship
          addNewFriend={addNewFriend}
        />
      </section>

      <section id="friendships-delete">
        <h3>Amistades eliminadas:{mq ? <button onClick={deleteHistory}>Borrar historial de amistades eliminadas</button> : null}</h3>

        <DeleteFriendship
          deletePerson={deletePerson}
        />
        {!mq ? <button onClick={deleteHistory}>Borrar historial de amistades eliminadas</button> : null}
      </section>

      <section id="friendships">
        <h3>Tu lista de amistades :</h3>
        <div id="content-person">
          {person.length > 0
            ? person.map((x, index) => (
              <ListFriendships
                key={index}
                fondoImagen={x.fondoImagen}
                imagenUsuario={x.imagenUsuario}
                nombreDeUsuario={x.nombreDeUsuario}
                apellidosDeUsuario={x.apellidosDeUsuario}
                profesion={x.profesion}
                sobreElUsuario={x.sobreElUsuario}
                edad={x.edad}
                genero={x.genero}
                pais={x.pais}
                ciudad={x.ciudad}
                comidaFavorita={x.comidaFavorita}
                colorFavorito={x.colorFavorito}
                serieFavorita={x.serieFavorita}
                peliculaFavorita={x.peliculaFavorita}
                cancionFavorita={x.cancionFavorita}
                tipoDeRelacion={x.tipoDeRelacion}
                belleza={x.belleza}
                sexy={x.sexy}
                index={index}

                changeUserImg={changeUserImg}
                changeBackgroundImg={changeBackgroundImg}

                showModal={() => setShowModal({
                  condition: true,
                  index: index
                })}

                deleteFriendship={() => deleteCardPerson(person, index)}
                showFriendsDelete={() => showFriendsDelete(x)}
              />
            ))
            : <h2 id="all-friendships-deleted">Todas las amistades han sido eliminadas</h2>
          }
        </div>
      </section>

    </div>
  )
}

export default Friendship;