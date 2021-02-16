import React, { useState } from 'react';
import Icon from '../assets/Icon';
import LoadImage from '../assets/LoadImage';
import Swal from 'sweetalert2';
import ReactStars from "react-rating-stars-component";

const ListFriendships = props => {
  const {
    fondoImagen,
    imagenUsuario,
    nombreDeUsuario,
    apellidosDeUsuario,
    profesion,
    sobreElUsuario,
    edad,
    genero,
    pais,
    ciudad,
    comidaFavorita,
    colorFavorito,
    serieFavorita,
    peliculaFavorita,
    cancionFavorita,
    tipoDeRelacion,
    belleza,
    sexy,
    showModal,
    index,
    changeUserImg,
    changeBackgroundImg
  } = props,

    /* Mostrar camara */
    [showCamera, setShowCamera] = useState(false),

    /* Cambiar icono de editar y check */
    [edit, setEdit] = useState(false),

    /* Capturando la actual img de usuario */
    [actualUserImg, setActualUserImg] = useState(''),

    /* Capturando la actual img de fondo */
    [actualBackgroundImg, setActualBackgroundImg] = useState(''),

    [applyChanges, setApplyChanges] = useState(null),

    loadImage = e => {
      const { name } = e.target,
        file = e.target.parentElement.querySelector('input[type="file"]').files[0], reader = new FileReader();
      reader.addEventListener('load', () => {
        if (name === 'userImg') {
          setActualUserImg(reader.result);
        } else {
          setActualBackgroundImg(reader.result);
        }
      }, false)
      file && reader.readAsDataURL(file);
    },

    confirmLoadImage = () => {
      Swal.fire({
        html: `<h3 id="applyChanges">¿Desea aplicar los cambios?</h3>`,
        background: 'rgba(0,0,0,0.85)',
        showDenyButton: true,
        confirmButtonText: '<i class="fas fa-check" id="apply-changes-check"></i>',
        denyButtonText: '<i class="fas fa-times"></i>',
        confirmButtonColor: '#12A002',
        denyButtonColor: '#A80000',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          if (!applyChanges) {
            actualUserImg !== '' && changeUserImg(actualUserImg, index);
          } else {
            actualBackgroundImg !== '' && changeBackgroundImg(actualBackgroundImg, index);
          }
          setShowCamera(false);
          setEdit(false);
        } else if (result.isDenied) {

          if (!applyChanges) {
            if (imagenUsuario.indexOf('user-') !== -1) {
              setActualUserImg('');
            } else {
              changeUserImg(imagenUsuario, index);
              setActualUserImg(imagenUsuario);
            }
          } else {
            if (fondoImagen.indexOf('background-') !== -1) {
              setActualBackgroundImg('');
            } else {
              changeBackgroundImg(fondoImagen, index);
              setActualBackgroundImg(fondoImagen);
            }
          }
          setShowCamera(false);
          setEdit(false);
        }
      })
    }

  return (
    <div className="person">

      <article className="image-person">

        <img className="background-image" src={!actualBackgroundImg ? `${process.env.PUBLIC_URL}/${fondoImagen}` : actualBackgroundImg} alt="background" />

        {showCamera
          ? <LoadImage
            onChange={e => {
              setApplyChanges(true);
              loadImage(e);
            }}
            name="backgroundImg"
            id="file"
          />
          : null}

      </article>

      <article className="name-person">
        {!edit
          ? <Icon title="Editar" className="fas fa-edit"
            onClick={() => {
              setShowCamera(true);
              setEdit(true);
            }} />
          : <Icon title="Aplicar cambios" className="fas fa-check" onClick={() => {
            confirmLoadImage();
          }} />
        }
        <Icon title="Eliminar" className="fas fa-trash" onClick={() => {
          Swal.fire({
            icon: 'warning',
            iconColor: '#BBB45B',
            html: `<h3 id="messageForDeleteFriend">¿Estás seguro(a) que deseas eliminar a ${nombreDeUsuario}?</h3>`,
            background: 'rgba(0,0,0,0.85)',
            showDenyButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Descartar`,
            confirmButtonColor: '#A80000',
            denyButtonColor: 'rgba(255,255,255,0.15)',
          }).then((result) => {
            if (result.isConfirmed) {
              props.deleteFriendship();
              props.showFriendsDelete();
            } else if (result.isDenied) {
              return null;
            }
          })
        }} />
        <figure>
          <img src={!actualUserImg ? `${process.env.PUBLIC_URL}/${imagenUsuario}` : actualUserImg} alt={nombreDeUsuario} title={nombreDeUsuario} onClick={() => showModal()} />

          {showCamera
            ? <LoadImage
              onChange={e => {
                setApplyChanges(false);
                loadImage(e);
              }}
              name="userImg"
              id="file1"
            />
            : null}

        </figure>
        <h4>{nombreDeUsuario} {apellidosDeUsuario}</h4>
        <span>{profesion}</span>
        <span><b>-</b></span>
        <p>“ {sobreElUsuario} ”</p>
      </article>

      <article className="information-person">

        <div className="date">
          <h4><Icon className="fab fa-pagelines" />&nbsp;Edad: <span>{edad} años</span></h4>
          <h4>{
            genero === "Masculino"
              ? <Icon className="fas fa-mars" />
              : genero === "Femenino"
                ? <Icon className="fas fa-venus" />
                : <Icon className="fas fa-neuter" />
          }&nbsp;Género: <span>{genero}</span></h4>
        </div>

        <div className="date">
          <h4><Icon className="fas fa-flag" />&nbsp;País de origen: <span>{pais}</span></h4>
          <h4><Icon className="fas fa-home" />&nbsp;Ciudad o Provincia: <span>{ciudad}</span></h4>
        </div>

        <div className="date">
          <h4><Icon className="fas fa-utensils" />&nbsp;Comida favorita: <span>{comidaFavorita}</span></h4>
          <h4><Icon className="fas fa-tint" />&nbsp;Color favorito: <span>{colorFavorito}</span></h4>
        </div>

        <div className="date">
          <h4><Icon className="fas fa-dragon" />&nbsp;Serie favorita: <span>{serieFavorita}</span></h4>
          <h4><Icon className="fas fa-video" />&nbsp;Película favorita: <span>{peliculaFavorita}</span></h4>
        </div>

        <div className="date">
          <h4><Icon className="fas fa-music" />&nbsp;Canción favorita: <span>{cancionFavorita}</span></h4>
          <h4><Icon className="fas fa-heart" />&nbsp;Tipo de relación: <span>{tipoDeRelacion}</span></h4>
        </div>

        <div className="date">
          <h4><Icon className="fas fa-grin-hearts" />&nbsp;Belleza: <span>{belleza}</span></h4>
          <h4><Icon className="fab fa-angellist" />&nbsp;Sexy: <span>{sexy}</span></h4>
        </div>
      </article>

      <article className="assessment">
        <ReactStars
          count={5}
          size={18}
          char=""
          onChange={e => console.log(e)}
          color="white"
          color="rgba(255, 255, 255, 0.7)"
          activeColor="#F89D07"
        />
      </article>

    </div>
  )
};

export default ListFriendships;