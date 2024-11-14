export default function FeedComics({comicsArr, onSubmit, mostrarDetalles, favs}){

    function onClick(id){
        onSubmit(id);
    }

    return(

        comicsArr.map(item =>

            <div className="comic" key={item.id}>  
                <p>{item.title}</p>
                <img onClick = {() => mostrarDetalles(item)} src = {`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.title} height="400" width={290}/>
                <button className = "comicButton" onClick={() => onClick(item.id)}>{favs.includes(item.id) ? "En favoritos" : "Añadir a favoritos"}</button>
            </div>
        )
    )
}