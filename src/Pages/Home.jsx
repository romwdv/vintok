import hero from "../assets/banner-wide.jpg";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/offers`,
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  console.log(data);

  if (IsLoading) return <p>on load</p>;
  return (
    <div className="content">
      <div className="hero">
        <img src={hero} alt="heo section" />
      </div>
      <div className="container">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eius
        tempora, doloribus provident amet incidunt unde laborum vero quod itaque
        asperiores corrupti cupiditate maxime similique in, praesentium omnis
        sint vitae! Harum animi fuga accusamus, quod eaque ipsum sunt ut quasi
        eum, nam, amet pariatur unde officiis nihil consequatur dolor delectus
        laborum enim fugiat recusandae nulla minima fugit? Unde, aliquid
        aliquam! Deleniti, omnis saepe incidunt et iusto illum at. Iste velit,
        voluptatem fugit architecto quis minus excepturi, reprehenderit cumque
        in dolorem laborum officia doloribus? Hic, laboriosam dolorum? Facere
        iure nihil odit. Voluptatibus aperiam neque facere maxime aut.
        Voluptatum velit ab consequatur sunt nisi numquam tempora vel
        reprehenderit atque quaerat modi voluptatibus aut, maiores optio illum
        tenetur vero est itaque. Corrupti, non? Distinctio a, ut similique
        reiciendis facilis error perspiciatis reprehenderit quisquam natus
        ratione ab dolores, aliquid aperiam autem obcaecati. Deleniti numquam,
        ullam tempora earum quam a autem? Tempora accusantium commodi totam.
        Blanditiis aperiam, porro natus quo rem doloremque adipisci expedita
        harum, at repudiandae totam cupiditate quasi atque nesciunt perspiciatis
        ipsa amet accusamus iste dicta ea fuga suscipit est sint aliquid! Quod?
        Illo neque quia asperiores natus consequuntur. Quod vel exercitationem
        reiciendis! Eos omnis exercitationem alias id. Inventore quod, rerum,
        nesciunt accusantium sit libero neque iusto nulla aliquid fugiat laborum
        consectetur? Culpa. Numquam, odio ullam. Similique quaerat, doloremque
        eius exercitationem vero, minus dolor soluta tenetur maxime recusandae
        repudiandae maiores perspiciatis qui? Veritatis pariatur minus
        perspiciatis nisi. Maiores dolorum rerum hic excepturi illo. Tempora
        deserunt ea ut, odit placeat vero officia consequuntur quisquam culpa
        nobis, iusto fuga praesentium similique. Quis saepe, nam fugit similique
        cum commodi sequi blanditiis accusantium enim ducimus quasi dolorum! At
        fugit consequatur placeat porro nisi eligendi ad? Id excepturi
        voluptates esse ullam cupiditate consequuntur omnis atque architecto,
        velit consequatur beatae laboriosam dolore eius debitis repudiandae cum
        odit, delectus sed.
      </div>
    </div>
  );
};

export default Home;
