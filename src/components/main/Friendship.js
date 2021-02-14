import React, { useState } from 'react';
import './css/styles.css';

/* Components */
import AddFriendship from './AddFriendship';
import DeleteFriendship from './DeleteFriendship';
import ListFriendships from './ListFriendships';
import Modal from './Modal';

/* JSON */
import friendships from '../json/friendships';

/* Librarys */
import Swal from 'sweetalert2';

const Friendship = () => {

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
        hour = `${newDate.getHours()}:${newDate.getMinutes()}`;
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
        <h3>Amistades eliminadas:</h3>
        <DeleteFriendship
          deletePerson={deletePerson}
        />
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
                showModal={() => setShowModal({
                  condition: true,
                  index: index
                })}
                deleteFriendship={() => {
                  Swal.fire({
                    icon: 'warning',
                    iconColor: '#BBB45B',
                    html: `<h3 id="messageForDeleteFriend">¿Estás seguro(a) que deseas eliminar a ${x.nombreDeUsuario}?</h3>`,
                    background: 'rgba(0,0,0,0.85)',
                    showDenyButton: true,
                    confirmButtonText: `Eliminar`,
                    denyButtonText: `Descartar`,
                    confirmButtonColor: '#A80000',
                    denyButtonColor: 'rgba(255,255,255,0.15)',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteCardPerson(person, index);
                      showFriendsDelete(x);
                    } else if (result.isDenied) {
                      return null;
                    }
                  })
                }}
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