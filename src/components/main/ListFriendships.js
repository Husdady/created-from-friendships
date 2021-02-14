import React, { useState } from 'react';
import Icon from '../assets/Icon';
import LoadImage from '../assets/LoadImage';
import Swal from 'sweetalert2';

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
    showModal
  } = props;

  const [edit, setEdit] = useState(false),
  [showCamera, setShowCamera] = useState(false),
  [applyChanges, setApplyChanges] = useState(true),

  loadImage = e => {
    const newImg = e.target.parentElement.parentElement.querySelector('img');
    const imageActual = e.target.parentElement.parentElement.querySelector('img').src;
    const file = e.target.parentElement.querySelector('input[type="file"]').files[0];
    const reader = new FileReader();
    
    if (applyChanges){
    reader.addEventListener('load', () => {
      newImg.src = reader.result;
      setShowCamera(false);
    })
    file && reader.readAsDataURL(file);
    } else {
      return null;
    }
  },
  
  confirmLoadImage = () =>{

    Swal.fire({
      html: `<h3 id="applyChanges">¿Desea aplicar los cambios?</h3>`,
      background: 'rgba(0,0,0,0.85)',
      showDenyButton: true,
      confirmButtonText: '<i class="fas fa-check" id="apply-changes-check"></i>',
      denyButtonText: '<i class="fas fa-times"></i>',
      confirmButtonColor: '#12A002',
      denyButtonColor: '#A80000',
    }).then((result) => {
      if (result.isConfirmed) {
        return setApplyChanges(true);
      } else if (result.isDenied) {
        return setApplyChanges(false);
      }
    })   
  }

  return (
    <div className="person">

      <article className="image-person">

        <img className="background-image" src={`${process.env.PUBLIC_URL}/${fondoImagen}`} alt="background" />

        {showCamera
          ? <LoadImage
            onChange={e => loadImage(e)}
            id="file"
          />
          : null}

      </article>

      <article className="name-person">
        {!edit
          ? <Icon title="Editar" className="fas fa-edit"
          onClick={() => {
            setEdit(true);
            setShowCamera(true);
          }} />
          : <Icon title="Aplicar cambios" className="fas fa-check" onClick={() => { setEdit(false); confirmLoadImage() }} />
        }
        <Icon title="Eliminar" className="fas fa-trash" onClick={props.deleteFriendship} />
        <figure>
          <img src={`${process.env.PUBLIC_URL}/${imagenUsuario}`} alt={nombreDeUsuario} title={nombreDeUsuario} onClick={showModal} />

          {showCamera
            ? <LoadImage
            onChange={e => loadImage(e)}
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
        <Icon className="fas fa-star" />
        <Icon className="fas fa-star" />
        <Icon className="fas fa-star" />
        <Icon className="fas fa-star" />
        <Icon className="fas fa-star" />
      </article>

    </div>
  )
};

export default ListFriendships;