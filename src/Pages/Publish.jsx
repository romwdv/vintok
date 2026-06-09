import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { FcAddImage } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Publish.css";

const Publish = () => {
  // retour page publish après login
  // utiliser uselocation
  const navigate = useNavigate();

  const isLogin = Cookies.get("vintok");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [pictures, setPictures] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    // Créer les aperçus des images
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    // Ajouter les fichiers au tableau
    setPictures((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setPictures((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (pictures.length === 0) {
      alert("Veuillez ajouter au moins une image");
      return;
    }

    const token = isLogin;
    const formData = new FormData();

    // Ajouter les champs texte
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("brand", brand);

    // Ajouter toutes les images
    pictures.forEach((picture) => {
      formData.append("picture", picture);
    });

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
      navigate(`/offer/${response.data.id}`);
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
          ></textarea>
          <input
            type="file"
            name="pictures"
            id="pictures"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <button
            type="button"
            className="add-images-btn"
            onClick={() => document.getElementById("pictures").click()}
          >
            <FcAddImage size={24} />
            Ajouter des photos
          </button>

          {/* Affichage des images uploadées */}
          {previewUrls.length > 0 && (
            <div className="image-preview-container">
              <h3>Images uploadées ({previewUrls.length})</h3>
              <div className="image-gallery">
                {previewUrls.map((url, index) => (
                  <div key={index} className="image-item">
                    <img src={url} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="delete-image-btn"
                      onClick={() => handleRemoveImage(index)}
                      title="Supprimer cette image"
                    >
                      <MdDeleteOutline size={24} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

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
    <Navigate to="/login" />
  );
};

export default Publish;
