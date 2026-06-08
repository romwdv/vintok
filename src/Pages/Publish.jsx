import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { FcAddImage } from "react-icons/fc";

const Publish = () => {
  const isLogin = Cookies.get("vintok");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [picture, setPicture] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = isLogin;
    const formData = new FormData();

    // modif
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("brand", brand);
    formData.append("picture", picture);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/offer/publish`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLogin ? (
    <section className="container publish">
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Mettre en vente ton article</h2>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            placeholder="Titre de l'annonce"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />

          <input
            type="text"
            name="marque"
            id="marque"
            placeholder="Marque"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
          <input
            type="text"
            name="Taille"
            id="Taille"
            placeholder="Taille"
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
          <input
            type="text"
            name="couleur"
            id="couleur"
            placeholder="Couleur"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
          <input
            type="text"
            name="prix"
            id="prix"
            placeholder="Prix"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <input
            type="text"
            name="condition"
            id="condition"
            placeholder="Etat de l'article"
            value={condition}
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
          <label htmlFor="description">Description :</label>
          <textarea
            name="description"
            id="description"
            placeholder="Ajoute une description pour mettre en valeur ton article"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
          <label htmlFor="picture">
            Ajoute une photo à ton annonce <FcAddImage size={38} />
          </label>
          <input
            type="file"
            name="picture"
            id="picture"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
          <input
            type="submit"
            name="submit"
            id="submit"
            value="Mettre en vente"
          />
        </form>
      </div>
    </section>
  ) : (
    <Navigate to="/signup" />
  );
};

export default Publish;
