export default function Detalles({comic, onClose}){

    return (
        <div className="detalleComic">
          <button className="detalleClose" onClick={onClose}>Cerrar</button>
          <div className="detalleContent">
            <img src = {`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} className="detalleImage" />
            <div className="detalleInfo">
              <h2 className="detalleTitle">{comic.title}</h2>
              <p className="detalleDescription">{comic.description}</p>
              <p className="detalleAuthor">Autor: {comic.creators.items[0].name}</p>
            </div>
          </div>
        </div>
      );
}