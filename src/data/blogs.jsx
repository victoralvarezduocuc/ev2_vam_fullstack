
import React from 'react';

function Blogs() {
  return (
    <>
      {/* BLOG 1: Pequeños productores */}
      <section className="py-5 text-center container" id="blog1">
        <div className="row py-lg-5">
          <div className="col-lg-8 mx-auto">
            <h1 className="fw-light">
              De la tierra a la mesa: El valor de los pequeños productores
            </h1>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-5">
            <img
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&auto=format&fit=crop&q=60"
              className="img-fluid mb-3"
              alt="Pequeños productores"
              style={{ borderRadius: '15px' }}
            />

            <img
              src="https://plus.unsplash.com/premium_photo-1661420226112-311050ce30da?w=500&auto=format&fit=crop&q=60"
              className="img-fluid"
              alt="Trabajo de pequeños productores"
              style={{ borderRadius: '15px' }}
            />
          </div>

          <div className="col-md-7 text-start">
            <p className="lead text-body-secondary">
              Detrás de cada queso de autor, cada frasco de miel de bosque o
              cada verdura de cultivo ecológico hay historias de esfuerzo,
              tradición y un profundo respeto por el medio ambiente. Consumir
              ingredientes artesanales y sostenibles no es solo una elección
              culinaria, es una declaración de principios que apoya a la
              economía local y preserva la biodiversidad.
            </p>

            <p className="lead text-body-secondary">
              Los pequeños productores trabajan a otra escala. No buscan la
              producción masiva ni el rendimiento acelerado, sino la excelencia
              y la autenticidad. Esto se traduce en alimentos con perfiles de
              sabor complejos y genuinos, libres de químicos innecesarios y
              cultivados siguiendo los ciclos naturales de la tierra. Un tomate
              heredado sabe a tomate real porque ha madurado al sol, y un pan
              de masa madre fermentado lentamente alimenta de verdad.
            </p>

            <p className="lead text-body-secondary">
              Incorporar estos tesoros artesanales a nuestra cocina diaria
              transforma nuestra relación con la comida. Nos invita a conocer
              el origen de lo que ponemos en el plato, a valorar el tiempo que
              hay detrás de cada producto y a redescubrir sabores perdidos que
              la industria alimentaria convencional dejó atrás.
            </p>
          </div>
        </div>
      </section>

      {/* BLOG 2: Alta cocina en casa */}
      <section className="py-5 text-center container" id="blog2">
        <div className="row py-lg-5">
          <div className="col-lg-8 mx-auto">
            <h1 className="fw-light">
              El arte de transformar lo cotidiano: Alta cocina en tu propia mesa
            </h1>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-5">
            <img
              src="https://images.unsplash.com/photo-1590080876351-941da357bde6?w=500&auto=format&fit=crop&q=60"
              className="img-fluid"
              alt="Ingredientes para alta cocina"
              style={{
                borderRadius: '15px',
                marginBottom: '20px',
              }}
            />
          </div>

          <div className="col-md-7 text-start">
            <p className="lead text-body-secondary">
              La alta cocina no tiene por qué quedarse en los restaurantes.
              Con buenos ingredientes, creatividad y atención a los detalles,
              puedes convertir una comida cotidiana en una experiencia especial.
            </p>

            <p className="lead text-body-secondary">
              Elegir productos de calidad, combinar sabores y cuidar la
              presentación permite descubrir nuevas posibilidades en tu propia
              cocina. Los ingredientes frescos y artesanales aportan personalidad
              a cada preparación.
            </p>

            <p className="lead text-body-secondary">
              Experimenta con nuevas técnicas, disfruta el proceso y recuerda
              que los pequeños detalles pueden transformar una receta sencilla
              en un plato memorable.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Blogs;
