import React from 'react'
import styles from '../../../../styles/Home.module.css'

const Gallery = (props) => {
  const { gallery, loadMore, launchModal, selectedImage, searchedQuery } = props
  console.log('gallery',loadMore)
  // console.log('gallery = ', gallery)
  return (
    <div className="contentUS">
      <section className="gridUS">
        {gallery!=null ? gallery.map( (image, index) => (
          <div
            key={image.id}
            className={`item item-${Math.ceil(
              image.height / image.width,
            )}`}
          >
            <img
              src={image.urls.small}
              alt={image.description}
              data-toggle="modal" data-target="#selected-img-modal"
              onClick={() => launchModal(index)}
            />
          </div>
        )) : (
          <div>
            <div>
              {searchedQuery === '' ? (
              <p>Oups, il n'y a apparemment pas d'images correspondant à votre requête</p>
              ) : (
                <p>Oups, il n'y a apparemment pas d'images correspondant à votre requête ! Réessayez </p>
              )}
            </div>
          </div>
        )}
      </section>
      <button type="button" className={styles.buttonuns} onClick={loadMore}>Voir plus</button>
    </div>
  )
}

export default Gallery