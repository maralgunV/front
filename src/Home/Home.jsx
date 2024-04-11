import React, { useState } from "react";
import "./Home.css";
import axios from "axios";
import Waveform from "../Waveform/Waveform";

function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1>Тухай</h1>
      <h4 className="home-h4">
        Энэхүү вебсайт нь ярианы чанар сайжруулах зорилгоор бүтээгдсэн ба
        цаашдаа <br /> энэ чиглэлийн олон төрлийн үйлчилгээг үзүүлдэг болох
        зорилготой.
      </h4>
      <h4 className="home-h4">
        Ярианы чанар сайжруулах AI модел нь нээлттэй сан Speechbrain-ий моделийг
        <br /> авч ашигласан. Ирээдүйд бусад төрлийн AI моделийг судалж онлайн
        аудио
        <br /> засварлах зориулалттай вебсайт болгох чиглэлтэй ажиллана.
      </h4>
      <div className="image-box">
        <img
          src="/audio_image.jpg"
          alt="Description of Third Image"
          style={{
            top: "0",
            right: "0",
            width: "900px",
            height: "600px",
          }}
        />
      </div>
    </div>
  );
}

export default Home;
