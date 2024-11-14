import { useState } from 'react'
import {useEffect} from 'react'
import CryptoJS from 'crypto-js';
import './App.css'
import FeedComics from './components/FeedComics';
import Detalles from './components/Detalles';


function App() {
  const [comics, setComics] = useState([])
  const [comicSeleccionado, setComicSeleccionado] = useState(null);

  //const hash = "1ab1121e3f8c44691c1cafa835836247"
  const publicKey = "70cfe7f07bd557a468fec747b11b5e5e"
  const privateKey = "0b8d888a994e02a5561a921f30dadc7b2008f2aa"
  const ts = "2"
  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

  const [idsEnFav, setIdsEnFav] = useState([]);

  const getComics = async() => {

    const response = await fetch(`https://gateway.marvel.com/v1/public/comics?orderBy=modified&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    .then((res) => res.json())
    .then(comicsR => {

      console.log(comicsR.data.results);
      setComics(comicsR.data.results);
    })
  }

  useEffect(() => {

    getComics();

    const idsGuardados = JSON.parse(localStorage.getItem("idsEnFav")) || [];
    setIdsEnFav(idsGuardados);
  },[])

  function onSubmit(id){

    setIdsEnFav((estadoActual) => {
      let nuevoEstado;
      
      if (estadoActual.includes(id)) {
        nuevoEstado = estadoActual.filter(itemId => itemId !== id);
      } else {
        nuevoEstado = [...estadoActual, id];
      }

      localStorage.setItem("idsEnFav", JSON.stringify(nuevoEstado));
      return nuevoEstado;
    });
  }

  function mostrarDetalles(comic){
    setComicSeleccionado(comic);
  }

  function cerrarDetalles(){
    setComicSeleccionado(null);
  }

  return (
    <>
      {comics.length > 0 ? (
        comicSeleccionado ? (
          <Detalles comic={comicSeleccionado} onClose={cerrarDetalles} />
        ) : (
          <div>
            <p className='tituloPagina'>MARVEL</p>
            <div className='feedComics'>
              <FeedComics comicsArr={comics} onSubmit = {onSubmit} mostrarDetalles = {mostrarDetalles} favs = {idsEnFav}></FeedComics>
            </div>
          </div>
        )
      ) : (
        <p>Loading comics...</p>
      )}
    </>
  )
}

export default App