mport { useState, useEffect } from "react";
import axios from "axios";
import faker from "faker";

const PeopleAxios = () => {
  const [insanlar, setInsanlar] = useState([]);
  //?-----1 insanlar=[]

  // state yenilenince ekrana  basılacaklar değişiyor ve sayfa tekrar render ediliyor, tekrar fetch işlemi oluyor, sonsuz döngü. bu yüzden useeffect. [insanlar] yazsak yine dizi (state) her değiştiğinde useeffect yap demek olur, yine sonsuz döngü
  
  //?  axios veriyi çekerken alttaki kodlar çalışmaya devam ediyor
  //? ----4 axios tan veriler geldi
  useEffect(() => {
    //!axios json formatına kendi çeviriyor ve post işlemi çok kolay

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setInsanlar(res.data))
      .catch((error) => console.log(error));
  }, []);

  //?------2  veri oluşturulur (önce insanlar dizisi olmadığı için 1 id ile, 2. gelişte (axios la veri çekilip insanlar dizisi oluştuğunda) 11 id li veri oluşur)
  const veri = {
    id: insanlar.length + 1,
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
  };
  console.log(veri);

  const postInsan = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        veri,
        //! üst taraf database yeniler
      })
      .then((res) => setInsanlar([...insanlar, res.data.veri]));
      //!üst taraf buradaki insanlar dizisini yeniler
  };
//* [...insanlar, res.data.veri] insanlar dizisinin parantezini aç, yeni veriyi ekle parantezi kapat
  //! ilk boş insanlar dizisi oluşur, sonra veri oluşur sonra return (tabi boş olduğu için ekran görünmez), axios tan veri gelince insanlar dolar ve return tekrar verilerle basılır
  //!eğer üstteki gibi veri adıyla fake verileri toplayacaksak ve axios un post adresinden sonra id:...,name:... YAZMAYACAKSAK, axios un içindeki setInsan kısmında res.data.veri yazmalı setInsan([...insanlar, res.data.veri])

  console.log(insanlar);

  //?----3 boş insanlar dizisi ekrana bastırılır
  //? -----5 dolu 10 elemanlı insanlar dizisi ekrana bastırılır
  return (
    <div className="container text-center mt-4">
   
      <button className="btn btn-success" onClick={postInsan}>
        POST DATA
      </button>
      <div className="row">
        {insanlar.map((insan) => {
          const { id, name, phone } = insan;

          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-2" key={id}>
              {/* https://avatars.dicebear.com/styles */}
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${id}.svg`}
                alt=""
              />
              <h5>{name}</h5>
              <h6>{phone}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PeopleAxios;









