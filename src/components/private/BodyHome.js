import React from 'react';

const BodyHome = ({parentToChild}) => {
    console.log({parentToChild})
    return (
        <div className="container">
        <div className="center">
          
        </div>
      </div>
    )
}

export default BodyHome

/*
{photos.map(photo =>
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>)}
            */